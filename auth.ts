import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./lib/getUser";
import bcryptjs from "bcryptjs";
import { SignInSchema } from "./lib/auth/schemas/sign-in";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github"

declare module "next-auth" {
  interface User {
    id?: string;
    username: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
    };
  }

  interface JWT {
    id: string;
    username: string;
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
                  username: user.username || `${user.id}`,
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
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
});
