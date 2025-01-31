/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { auth } from "./auth";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     secret: process.env.AUTH_SECRET,
//   });
//   const isOnConvesationPage =
//     request.nextUrl.pathname.startsWith("/conversation");
//   console.log("Curr path: ", request.nextUrl.pathname);

//   if (token) {
//     if (!isOnConvesationPage) {
//       console.log("Redirecting to conversation");
//       return NextResponse.redirect(
//         new URL("/conversation", request.nextUrl.href)
//       );
//     }
//     console.log("Token passed");
//     return NextResponse.next();
//   }

//   const loginPageURL = new URL("/login", request.url);
//   return NextResponse.redirect(loginPageURL);
// }

export default NextAuth(authConfig).auth;

// Вказати маршрути, які мають захищатися
export const config = {
  matcher: [
    // "/conversation/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
