"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <header className="bg-white mt-2">
      <div className="mx-auto flex justify-between h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 justify-center items-center ">
          <Image
            className=" hidden lg:flex"
            alt="logo"
            src={"./Logo.svg"}
            width={60}
            height={50}
          />
          <h1 className=" text-4xl">
            <strong className=" text-blue-500">W</strong>ise<strong>W</strong>
            allet
          </h1>
        </div>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href={'/sign-in'}>
            <Button>Get started</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
