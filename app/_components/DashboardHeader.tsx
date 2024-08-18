'use client'
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import DropMenu from './DropMenu';


function DashboardHeader() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  return (
    <div className=" p-5 shadow-sm border-b">
      <div className=" flex justify-between">
        <Link href={"/"}>
          <h1 className="text-2xl font-semibold">WiseWallet</h1>
        </Link>
        <div className=" flex justify-center items-center gap-3 md:hidden">
          <UserButton />
          <DropMenu />
          
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
