
'use client'
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
import dateFormat  from 'dateformat';
import { useUser } from "@clerk/nextjs";

interface Expense {
  id: number;
  name: string;
  amount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  budgetName: string;
}

function LatestExpense() {
  const { user } = useUser();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      const createdBy = user?.primaryEmailAddress?.emailAddress;
      if (!createdBy) return; // Ensure createdBy is available

      try {
        const response = await axios.post('/api/getexpenses', {
          createdBy, // Pass createdBy in the request body
        });
        setExpenses(response.data);
        
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  console.log(expenses)

  return (
    <div className=" py-3 mt-3 overflow-x-auto rounded-lg border border-gray-200">
      <h5 className=" p-4 font-semibold text-xl text-center underline underline-offset-8">
        Latest <strong className=" text-red-400">Expenses</strong>🚀
      </h5>
      <Table>
        <TableCaption>A list of your recent Expenses.</TableCaption>
        <TableHeader>
          <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Name of Budget</TableHead>
            <TableHead>CreatedOn</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell>{expense.budgetName}</TableCell>
              <TableCell>{dateFormat(expense.createdAt, "mmmm dS, yyyy, h:MM TT")}</TableCell>
              <TableCell className="text-right font-semibold text-red-500">
              ₹{expense.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    </div>
  );
}

export default LatestExpense;
