"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import LoginButton from "./auth/LoginButton";
import { Button } from "./ui/button";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const NavBar = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row items-center justify-between p-2 md:m-6">
        <div className="flex flex-row items-center justify-center space-x-2 ml-2">
          <Link
            className="text-2xl md:text-4xl text-primary-text font-font-heading  "
            href="/"
          >
            SuprStore
          </Link>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2 ml-2">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            onClick={() => router.push("/post")}
          >
            Post
          </HoverBorderGradient>
          <LoginButton />
        </div>
      </div>
    </>
  );
};

export default NavBar;
