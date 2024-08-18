// @ts-nocheck
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
import dateFormat from "dateformat";
function ExpensesList({ expense }) {
  return (
    <div className=" m-4">
      {" "}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Expense💵</TableHead>
            <TableHead>Date📅</TableHead>
            <TableHead className="text-right">Amount💲</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expense?.map((expense): any => (
            <TableRow key={expense.id}>
              <TableCell className=" font-semibold">{expense.name}</TableCell>
              <TableCell>
                {dateFormat(expense.createdAt, "mmmm dS, yyyy, h:MM TT")}
              </TableCell>
              <TableCell className="text-right">{expense.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ExpensesList;
