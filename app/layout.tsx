import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/common/SessionProvider";
import { getServerSession } from "next-auth";
import LoginButton from "@/components/auth/LoginButton";
import NavBar from "@/components/NavBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="flex flex-col mt-12 mb-4 max-w-7xl mx-auto w-full px-6 lg:px-0  min-h-screen">
            <NavBar />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
