import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./lib/getUser";
import bcryptjs from "bcryptjs";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { GitHubProfile } from "next-auth/providers/github";
import { prisma } from "./lib/prisma-client/prisma-client";
import { GoogleProfile } from "next-auth/providers/google";
import { randomUUID } from "crypto";

declare module "next-auth" {
  interface User {
    id?: string;
  }

  interface Session {
    user: {
      id: string;
    };
    account: {
      userId: string;
    };
  }

  interface JWT {
    id: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const username = credentials.username as string;
        const password = credentials.password as string;

        const user = await getUser(username);

        if (user) {
          if (user.password) {
            const isPasswordValid = await bcryptjs.compare(
              password,
              user.password
            );
            if (isPasswordValid) {
              return {
                ...user,
                username: user.username || `user_${user.id}`,
              };
            }
          }
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile: GoogleProfile) {
        const user = await prisma.user.upsert({
          where: { email: profile.email },
          update: {},
          create: {
            email: profile.email,
            emailVerified: profile.email_verified,
            accounts: {
              create: {
                provider: "google",
                providerAccountId: String(profile.id),
                type: "oauth",
              },
            },
            refreshToken: {
              create: {
                refreshToken: profile.refresh_token || randomUUID(),
                expiresAt: profile.exp,
              },
            },
          },
        });

        return user;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      async profile(profile: GitHubProfile) {
        const user = await prisma.user.upsert({
          where: { username: profile.login },
          update: {},
          create: {
            username: profile.login,
            accounts: {
              create: {
                provider: "github",
                providerAccountId: String(profile.id),
                type: "oauth",
              },
            },
            refreshToken: {
              create: {
                refreshToken: randomUUID(),
                expiresAt: 2592000,
              },
            },
          },
        });

        return user;
      },
    }),
  ],
});
