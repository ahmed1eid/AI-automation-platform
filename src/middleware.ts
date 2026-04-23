import NextAuth from "next-auth";
import { authConfig } from "@/models/auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
