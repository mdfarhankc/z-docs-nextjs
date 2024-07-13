"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Logo from "./Logo";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 px-3 py-5 flex justify-between items-center border-b",
        isHomePage
          ? "backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-gray-200 dark:border-gray-700"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
      )}
    >
      <Logo />
      <div className="flex items-center justify-between gap-x-3">
        <ThemeToggleButton />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
