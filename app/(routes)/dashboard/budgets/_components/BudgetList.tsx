"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BudgetCard from "./BudgetCard";
import Loading from "./Loading";
import { useUser } from "@clerk/nextjs";

function BudgetList() {
  const { user } = useUser();
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const useremail = user?.primaryEmailAddress?.emailAddress;
        console.log(useremail);
        const response = await axios.post("/api/getbudget", {
          createdBy: useremail,
        });
        setBudgets(response.data);
        setisLoading(false);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, [budgets]);

  console.log(budgets);
  return (
    <>
      {isLoading ? (
        <div className=" mt-2 ">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {budgets?.map((budget) => (
            <BudgetCard key={budget.id} item={budget} />
          ))}
        </div>
      )}
    </>
  );
}

export default BudgetList;
