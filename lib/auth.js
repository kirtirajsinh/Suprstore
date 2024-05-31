import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { validateJWT } from "./authHelpers";
import Credentials from "@auth/core/providers/credentials";

export const config = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const token = credentials?.token;
        if (typeof token !== "string" || !token) {
          throw new Error("Token is required");
        }
        const jwtPayload = await validateJWT(token);

        if (jwtPayload) {
          const email = jwtPayload.email;

          if (!email) {
            throw new Error("Invalid email");
          }

          let user = await prisma.User.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: email,
              },
            });

            await prisma.account.create({
              data: {
                userId: user.id,
              },
            });
          }

          return {
            id: user.id,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (token.sub) {
        session.user = {
          ...user,
          id: token.sub,
        };
      }

      const mySecret = new Uint8Array(
        Buffer.from(process.env.JWT_SECRET, "hex")
      );

      session.myJwt = await new EncryptJWT(token)
        .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .encrypt(mySecret);

      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
