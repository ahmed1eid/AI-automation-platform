export { auth as middleware } from "@/models/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
