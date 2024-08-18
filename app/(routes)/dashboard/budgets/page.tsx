import React from "react";
import BudgetList from "./_components/BudgetList";
import { Button } from "@/components/ui/button";
import CreateBudget from "./_components/CreateBudget";

function page() {
  return (
    <div>
      <div className=" flex justify-between mt-2 mr-5">
        <p className=" font-bold p-2 ">Your Budgets</p>
        <CreateBudget />
      </div>
      <div >
        <BudgetList />
      </div>
    </div>
  );
}

export default page;
