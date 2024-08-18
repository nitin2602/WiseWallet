import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { createdBy } = await req.json();
    console.log(createdBy)

    if (!createdBy) {
      return NextResponse.json(
        { error: "createdBy is required" },
        { status: 400 }
      );
    }

    // Fetch all budgets with the total expenses amount and the count of expenses where createdBy matches
    const budgets = await prisma.budget.findMany({
      where: {
        createdBy: createdBy,
      },
      include: {
        expenses: {
          select: {
            amount: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const budgetsWithAggregates = budgets.map((budget) => {
      const totalExpensesAmount = budget.expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      const expenseCount = budget.expenses.length;

      return {
        id: budget.id,
        name: budget.name,
        amount: budget.amount,
        createdBy: budget.createdBy,
        icon: budget.icon,
        createdAt: budget.createdAt,
        updatedAt: budget.updatedAt,
        totalExpensesAmount,
        expenseCount,
      };
    });

    return NextResponse.json(budgetsWithAggregates, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}
