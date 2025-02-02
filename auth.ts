import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./lib/getUser";
import bcryptjs from "bcryptjs";
import { SignInSchema } from "./lib/auth/schemas/sign-in";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { prisma } from "./lib/prisma-client/prisma-client";

declare module "next-auth" {
  interface User {
    id?: string;
    username?: string;
  }

  interface Session {
    user: {
      id: string;
      username?: string;
    };
    account: {
      userId: string;
      username?: string;
    };
  }

  interface JWT {
    id: string;
    username?: string;
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
        const parsedCredentials = SignInSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;

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
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const user = await prisma.user.upsert({
          where: { username: profile.email },
          update: {},
          create: {
            username: profile.email,
            email: profile.email,
            emailVerified: profile.email_verified,
            accounts: {
              create: {
                provider: "google",
                providerAccountId: String(profile.id),
                access_token: profile.access_token
                  ? String(profile.access_token)
                  : null,
                refresh_token: profile.refresh_token
                  ? String(profile.refresh_token)
                  : null,
                type: "oauth",
                expires_at: profile.exp,
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
      async profile(profile) {
        const user = await prisma.user.upsert({
          where: { username: profile.login },
          update: {},
          create: {
            username: profile.login,
            accounts: {
              create: {
                provider: "github",
                providerAccountId: String(profile.id),
                access_token: profile.access_token
                  ? String(profile.access_token)
                  : null,
                refresh_token: profile.refresh_token
                  ? String(profile.refresh_token)
                  : null,
                type: "oauth",
              },
            },
          },
        });

        return user;
      },
    }),
  ],
});
