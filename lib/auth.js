import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
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
