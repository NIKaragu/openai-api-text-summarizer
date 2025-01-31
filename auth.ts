import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./lib/getUser";
import bcryptjs from "bcryptjs";
import { SignInSchema } from "./lib/auth/schemas/sign-in";
import { authConfig } from "./auth.config";

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
  ],
});
