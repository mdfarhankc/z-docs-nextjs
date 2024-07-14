"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import Logo from "./Logo";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isLearnMorePage = pathname === "/learn-more";
  const isPrivacyPage = pathname === "/privacy";
  const isTermsOfServicePage = pathname === "/terms-of-service";

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 px-3 py-5 flex justify-between items-center border-b",
        isHomePage || isLearnMorePage || isPrivacyPage || isTermsOfServicePage
          ? "backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-gray-200 dark:border-gray-700"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
      )}
    >
      <Logo />
      <div className="flex items-center justify-between gap-x-3">
        <SignedIn>
          <Button asChild variant={"dashboard"}>
            <Link href={"/documents"}>
              Dashboard <ChevronRight size={20} />
            </Link>
          </Button>
        </SignedIn>
        <ThemeToggleButton />
        <SignedOut>
          <nav className="flex justify-between items-center">
            <Button variant={"link"} asChild>
              <Link href={"sign-in"}>SignIn</Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href={"sign-up"}>SignUp</Link>
            </Button>
          </nav>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
