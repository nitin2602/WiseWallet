"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./../../budgets/_components/Loading";
import BudgetCard from "../../budgets/_components/BudgetCard";
import AddNewExpense from "./../_components/AddNewExpense";
import ExpensesList from "./../_components/ExpensesList";
import { Button } from "@/components/ui/button";

import Alert from './../_components/Alert';

function page({ params }: any) {
  const { user } = useUser();
  const createdBy = user?.primaryEmailAddress?.emailAddress;

  const [budget, setBudget] = useState([]);
  let id = params.id;
  const [isLoading, setisLoading] = useState<boolean>(true);
  // let  createdBy = user.

  useEffect(() => {
    if (id && createdBy) {
      const fetchBudget = async () => {
        try {
          const response = await axios.post("/api/getbudgetbyID/", {
            id,
            createdBy,
          });
          setBudget(response.data);
        } catch (error) {
          console.error("Error fetching budget:", error);
        } finally {
          setisLoading(false);
        }
      };

      fetchBudget();
    }
  }, [id, createdBy]);

  console.log("Budget-- ", budget);
  const expenses = budget.expenses;


  return (
    <>
      <div className=" flex justify-between mt-2 mr-5">
        <div className=" text-2xl font-bold m-2">
          {budget?.name}'s Latest Expenses
        </div>
        <div className=" flex-col gap-5 justify-center items-center  md:flex md:flex-row">
          <AddNewExpense user={createdBy} budgetID={id} />
          <Alert  id = {id} />
        </div>
      </div>
      <ExpensesList expense={expenses} />
    </>
  );
}

export default page;
