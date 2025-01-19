import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUser } from "./lib/getUser";
import bcryptjs from "bcryptjs";

declare module "next-auth" {
  interface User {
    id: string;
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
    name: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string().min(2), password: z.string().min(8) })
          .safeParse(credentials);

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
              // eslint-disable-next-line no-console
              console.error("Password is invalid");
            }
          }
          // eslint-disable-next-line no-console
          console.error("User not found");
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      } else {
        token = {};
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
});
