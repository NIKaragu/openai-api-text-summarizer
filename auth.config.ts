import { NextAuthConfig } from "next-auth";
import { authRoutes } from "./lib/auth/authRoutes";

export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnConvesationPage = nextUrl.pathname.startsWith("/conversation");
      const isAuthRoute = authRoutes.some(
        (route) => nextUrl.pathname === route
      );

      if (isAuthRoute) {
        return true;
      }

      if (isOnConvesationPage) {
        if (isLoggedIn) {
          return true;
        }

        return false;
      } else if (isLoggedIn && !isOnConvesationPage) {
        return Response.redirect(new URL("/conversation", nextUrl.href));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.username;
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
    signOut: "/",
    newUser: "/login/sign-up",
  },
  secret: process.env.AUTH_SECRET,
  providers: [],
} satisfies NextAuthConfig;
