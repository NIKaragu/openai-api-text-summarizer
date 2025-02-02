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
      const isOnConversationPage = nextUrl.pathname.startsWith("/conversation");
      const isAuthRoute = authRoutes.some(
        (route) => nextUrl.pathname === route
      );

      if (isAuthRoute) {
        return true;
      }

      if (isOnConversationPage) {
        if (isLoggedIn) {
          return true;
        }

        return false;
      } else if (isLoggedIn && !isOnConversationPage) {
        return Response.redirect(new URL("/conversation", nextUrl.href));
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.username = user.username ?? `user_${user.id}`;
      }
      if (account) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username =
          (token.username as string) ?? `user_${token.id}`;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    newUser: "/conversation",
  },
  secret: process.env.AUTH_SECRET,
  providers: [],
} satisfies NextAuthConfig;
