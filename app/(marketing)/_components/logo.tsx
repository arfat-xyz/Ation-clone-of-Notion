import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        className="dark:hidden"
        height={40}
        width={40}
        alt="Logo"
        src={"/logo.svg"}
      />
      <Image
        className="dark:block hidden"
        height={40}
        width={40}
        alt="Logo"
        src={"/logo-dark.svg"}
      />
      <p className={cn("font-bold", font.className)}>Ation</p>
    </div>
  );
};

export default Logo;
