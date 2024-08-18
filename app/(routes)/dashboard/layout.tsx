import Sidenav from "@/app/_components/Sidenav";
import React from "react";
import DashboardHeader from "./../../_components/DashboardHeader";

function layout({ children }: any) {
  return (
    <div>
      <div className=" fixed md:w-64 hidden md:block">
        <Sidenav />
      </div>
      <div className=" md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default layout;
