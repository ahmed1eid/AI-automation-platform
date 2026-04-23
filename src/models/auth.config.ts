import type {NextAuthConfig} from "next-auth";

export const authConfig = {
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "dev-only-secret-change-in-production",
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedin = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            if (isOnDashboard) {
                if (isLoggedin) {
                    return true;
                }
                return false;
            }else if (isLoggedin) {
                if (nextUrl.pathname === "/login" || nextUrl.pathname === "/register") {
                    return Response.redirect(new URL("/dashboard", nextUrl));
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token }) {
            return token;
        },
    },
} satisfies NextAuthConfig;