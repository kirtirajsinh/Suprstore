import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { validateJWT } from "./authHelpers";
import Credentials from "@auth/core/providers/credentials";

export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials, request) {
        const token = credentials.token; // Safely cast to string; ensure to handle undefined case
        if (typeof token !== "string" || !token) {
          throw new Error("Token is required");
        }
        const jwtPayload = await validateJWT(token);
        if (jwtPayload) {
          // Transform the JWT payload into your user object
          const user = {
            id: jwtPayload.sub, // Assuming 'sub' is the user ID
            name: jwtPayload.name || "", // Replace with actual field from JWT payload
            email: jwtPayload.email || "", // Replace with actual field from JWT payload
            // Map other fields as needed
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    async session({ session, token }) {
      if (session) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
