import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateJWT } from "./authHelpers";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
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
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    {},
  ],
  callbacks: {
    async session({ session, user }) {
      const account = await prisma.account.findFirst({
        where: {
          userId: user.id,
        },
      });

      session.user.access_token = account.access_token;
      return session;
    },
  },
};
