import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  PiBackpackBold,
  PiBaseballCapBold,
  PiCoatHangerBold,
  PiPantsBold,
  PiShoppingBagOpenBold,
  PiSneakerBold,
  PiDiscordLogo,
  PiNewspaperBold,
  PiStickerBold,
  PiGameControllerBold,
} from "react-icons/pi";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative px-44 py-32 ">
        <PiCoatHangerBold className="text-6xl transition-colors duration-300 text-primary-lightext hover:text-secondary-lighttext absolute left-20 top-8 -rotate-12" />
        <PiPantsBold className="text-6xl transition-colors duration-300 text-primary-lightext hover:text-secondary-lighttext absolute left-12 top-40 rotate-12" />
        <PiSneakerBold className="text-6xl transition-colors duration-300 text-primary-lightext hover:text-secondary-lighttext absolute bottom-8 md:bottom-16 rotate-[30deg]" />
        <PiGameControllerBold className="text-6xl transition-colors duration-300 text-primary-lightext hover:text-secondary-lighttext absolute bottom-0 left-80 -rotate-[30deg]" />
        <PiNewspaperBold className="text-6xl hidden md:block transition-colors duration-300 text-primary-lightext hover:text-secondary-lighttext absolute bottom-0 right-52 rotate-[30deg]" />
        <PiStickerBold className="text-6xl transition-colors duration-300 text-primary-lightext hover:text-secondary-lighttext absolute right-28 bottom-20 rotate-[30deg]" />
        <PiDiscordLogo className="text-6xl transition-colors duration-300 text-primary-lightext hover:text-secondary-lighttext absolute right-16 top-40 -rotate-[30deg]" />
        <PiShoppingBagOpenBold className="text-6xl transition-colors duration-300 text-primary-lightext hover:text-secondary-lighttext absolute top-8 right-36 -rotate-12" />
        <PiBaseballCapBold className="text-6xl transition-colors duration-300 text-primary-lightext hover:text-secondary-lighttext absolute top-8 right-1/2 rotate-[30deg]" />

        <div className="flex flex-col gap-4 text-center">
          <h1 className="relative text-4xl md:text-5xl font-bold ">
            <span className="flex relative  justify-center -ml-40 ">
              <span className="overflow-y-hidden h-12 pl-6 text-left ml-48">
                <h1 className=" block h-full animate-spin-words  ">Launch</h1>
                <h1 className=" block h-full animate-spin-words ">Share</h1>
                <h1 className=" block h-full animate-spin-words ">Sell</h1>
              </span>
            </span>{" "}
            <p>Products in </p>
            <span className="underline-skew flex flex-row items-center justify-center">
              Niche{" "}
              <PiDiscordLogo className="text-6xl transition-colors duration-300  " />{" "}
              Communities
            </span>
          </h1>

          <div className="flex justify-center gap-3">
            <div>
              <Link href={"/login"}>
                <Button>Get Started</Button>
              </Link>
            </div>

            <div>
              <Link href={"#more"}>
                <Button>Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
