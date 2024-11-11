//@ts-nocheck
"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";

import React, { useEffect, useState } from "react";
import DashboardCards from "./_components/DashboardCards";
import axios from "axios";
import { Banknote, CircleDollarSign, CircleHelp } from "lucide-react";
import BudgetList from "./budgets/_components/BudgetList";
import LatestBudgets from "./_components/LatestBudgets";
import LatestExpense from "./_components/LatestExpense";
import DropMenu from "./../../_components/DropMenu";

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

  // console.log(summary);
  const currencyList = [
    { code: "EUR", name: "Euro" },
    { code: "USD", name: "US Dollar" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "CZK", name: "Czech Republic Koruna" },
    { code: "DKK", name: "Danish Krone" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "RON", name: "Romanian Leu" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "ISK", name: "Icelandic Króna" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli New Sheqel" },
    { code: "INR", name: "Indian Rupee" },
    { code: "KRW", name: "South Korean Won" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "THB", name: "Thai Baht" },
    { code: "ZAR", name: "South African Rand" },
  ];
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const handleSelectChange = async (value: string) => {
    setSelectedCurrency(value);

    try {
      const response = await axios.get(
        `https://api.freecurrencyapi.com/v1/latest`,
        {
          params: {
            apikey: "fca_live_AAMcIjbCcVD793L74pUP3ioXRTwhtE4U9aE4rogQ",
            currencies: value,
            base_currency: "INR",
          },
        }
      );

      const rate = response.data.data[value];
      setExchangeRate(rate);
      // console.log(`Exchange rate from INR to ${value}:`, rate);
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };
  const convertValue = (inrValue: number): string => {
    const convertedValue =
      exchangeRate && selectedCurrency ? inrValue * exchangeRate : inrValue;
    return convertedValue.toFixed(2); // Limit to 2 decimal points
  };

  return (
    <>
      <div className=" flex justify-around items-center">
        <div className=" m-3">
          <h2 className="  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Hello👋🏼,{user?.fullName}
          </h2>
          <p className=" text-gray-500 text-sm ">
            Here is Your All Budget details...
          </p>
        </div>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {currencyList.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-col m-5 lg:grid lg:grid-cols-3 gap-5">
        <DashboardCards
          symbol={selectedCurrency || "₹"}
          emoji="💵"
          title="Total Budget"
          value={convertValue(summary?.totalBudgetValue || 0)} // Using optional chaining with default value
          icon={<CircleDollarSign className="w-10 h-10" />}
        />
        <DashboardCards
          symbol={selectedCurrency || "₹"}
          emoji="💲"
          title="Total Spent"
          value={convertValue(summary?.totalExpenseValue || 0)} // Using optional chaining with default value
          icon={<Banknote className="w-10 h-10" />}
        />
        <DashboardCards
          symbol="#"
          emoji="🔢"
          title="Number of Budgets"
          value={summary?.totalNumberOfBudgets || 0} // Using optional chaining with default value, no conversion needed
          icon={<CircleHelp className="w-10 h-10" />}
        />
      </div>

      <div className=" flex-col gap-3 m-7  lg:flex lg:flex-row">
        <LatestBudgets
          convertValue={convertValue}
          exchangeRate={exchangeRate}
          selectedCurrency={selectedCurrency}
        />
        <LatestExpense
          convertValue={convertValue}
          exchangeRate={exchangeRate}
          selectedCurrency={selectedCurrency}
        />
      </div>
    </>
  );
}

export default Page;
