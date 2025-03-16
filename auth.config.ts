import { NextAuthConfig } from "next-auth";
import { authRoutes } from "./lib/auth/authRoutes";

export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 15 * 60,
    updateAge: 60,
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user || !!auth?.account;
      const isOnChatPage = nextUrl.pathname.startsWith("/chat");
      const isAuthRoute = authRoutes.some(
        (route) => nextUrl.pathname === route
      );

      if (isAuthRoute) {
        return true;
      }

      if (isOnChatPage) {
        if (isLoggedIn) {
          return true;
        }

        return false;
      } else if (isLoggedIn && !isOnChatPage) {
        return Response.redirect(new URL("/chat", nextUrl.href));
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.id = account.userId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      if (session.account) {
        session.account.userId = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    newUser: "/chat",
  },
  secret: process.env.AUTH_SECRET,
  providers: [],
} satisfies NextAuthConfig;
