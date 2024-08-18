"use client";
import { useUser } from "@clerk/nextjs";

import React, { useEffect, useState } from "react";
import DashboardCards from "./_components/DashboardCards";
import axios from "axios";
import { Banknote, CircleDollarSign, CircleHelp } from "lucide-react";
import BudgetList from "./budgets/_components/BudgetList";
import LatestBudgets from "./_components/LatestBudgets";
import LatestExpense from "./_components/LatestExpense";

interface Summary {
  totalBudgetValue: number;
  totalExpenseValue: number;
  totalNumberOfBudgets: number;
}

function Page() {
  const { user } = useUser();
  const [summary, setSummary] = useState<Summary | null>();

  useEffect(() => {
    const fetchSummaryData = async () => {
      const useremail = user?.primaryEmailAddress?.emailAddress;
      try {
        const response = await axios.post("/api/getinfo", {
          createdBy: useremail,
        });
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
        // Ensure loading state is cleared on error
      }
    };

    fetchSummaryData();
  }, []);

  console.log(summary);
  return (
    <>
      <div className=" m-3">
        <h2 className="  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Hello👋🏼,{user?.fullName}
        </h2>
        <p className=" text-gray-500 text-sm ">
          Here is Your All Budget details...
        </p>
      </div>

      <div className=" flex-col  m-5 lg:grid lg:grid-cols-3 gap-5 ">
        <DashboardCards
          symbol="₹"
          emoji="💵"
          title="Total Budget"
          value={summary?.totalBudgetValue}
          icon={<CircleDollarSign className=" w-10 h-10  " />}
        />
        <DashboardCards
          symbol="₹"
          emoji="💲"
          title="Total Spent"
          value={summary?.totalExpenseValue}
          icon={<Banknote className=" w-10 h-10  " />}
        />
        <DashboardCards
          symbol="#"
          emoji="🔢"
          title=" Number of Budgets"
          value={summary?.totalNumberOfBudgets}
          icon={<CircleHelp className=" w-10 h-10  " />}
        />
      </div>
      <div className=" flex-col gap-3 m-7  lg:flex lg:flex-row">
        <LatestBudgets />
        <LatestExpense />
      </div>
    </>
  );
}

export default Page;
