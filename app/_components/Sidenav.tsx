"use client";
import {
  HandCoins,
  LayoutDashboard,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Sidenav() {
  const path = usePathname();
  const MenuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: HandCoins,
      path: "/dashboard/budgets",
    },
  ];
  return (
    <div className="h-screen  border-r-2 p-5 ">
      <div className=" flex justify-center items-center">
        <Link href={"/"}>
          {" "}
          <h1 className=" text-2xl">
            <strong className=" text-blue-500">W</strong>ise<strong>W</strong>
            allet
          </h1>
        </Link>
      </div>
      <div className=" p-3">
        {MenuList.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-3  hover:bg-blue-300 cursor-pointer ${
              path === item.path ? "border-r-4 border-blue-500" : ""
            }`}
          >
            <Link href={item.path}>
              <div className=" flex">
                <item.icon className="w-6 h-6 mr-3 text-gray-500" />
                <span>{item.name}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className=" fixed bottom-0 mb-4 text-xl w-56 rounded-lg p-2 flex justify-end items-end">
        <div className=" flex justify-center items-center gap-3">
          Profile
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
