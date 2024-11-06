import React from "react";


import dateFormat  from 'dateformat';
import Link from "next/navigation";



function BudgetCard({ item }: any) {
  return (
    <div>
      
      <Link
        href={'/dashboard/expenses/' + item.id}
        className="relative  block m-4 overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {item.name}
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-600">
              <small>
                {dateFormat(item.createdAt, "mmmm dS, yyyy, h:MM TT")}
              </small>
            </p>
          </div>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">{item.amount}</dt>
            <dd className="text-xs text-gray-500">Amount Allocated </dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">
              {item.totalExpensesAmount}
            </dt>
            <dd className="text-xs text-gray-500">Amount Spent </dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">
              {item.amount - item.totalExpensesAmount}
            </dt>
            <dd className="text-xs text-gray-500">Amount left</dd>
          </div>
        </dl>
      </Link>
    </div>
  );
}

export default BudgetCard;
