// @ts-nocheck
"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useUser } from "@clerk/nextjs";

function LatestBudgets({ convertValue, exchangeRate,selectedCurrency }) {
  const { user } = useUser();

  const [budgets, setBudgets] = useState([]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  useEffect(() => {
    const createdBy = user?.primaryEmailAddress?.emailAddress;
    const fetchBudgets = async () => {
      if (!createdBy) return; // Ensure createdBy is available

      try {
        const response = await axios.post("/api/getbudget", {
          createdBy, // Pass createdBy in the request body
        });
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, []);
  // console.log(budgets)

  return (
    <div className="p-3 mt-3 overflow-x-auto rounded-lg border border-gray-200">
      <h5 className=" p-4 font-semibold text-xl text-center underline underline-offset-8 pt-2">
        Latest <strong className=" text-green-400">Budgets</strong>💵
      </h5>
      <Table>
        <TableCaption>A list of your recent budgets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Number of Expenses</TableHead>
            <TableHead>CreatedOn</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets.map((budget) => (
            <TableRow key={budget.id}>
              <TableCell className="font-medium">{budget.name}</TableCell>
              <TableCell>{budget.expenseCount}</TableCell>
              <TableCell>
                {dateFormat(budget.createdAt, "mmmm dS, yyyy, h:MM TT")}
              </TableCell>
              <TableCell className="text-right font-semibold text-blue-500">
                {selectedCurrency
                  ? `${selectedCurrency}${convertValue(budget.amount)}`
                  : `₹${convertValue(budget.amount)}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default LatestBudgets;
