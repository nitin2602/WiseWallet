import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { createdBy } = await req.json();

    if (!createdBy) {
      return NextResponse.json(
        { error: 'createdBy is required' },
        { status: 400 }
      );
    }

    // Fetch all expenses with their associated budget names, ordered by createdAt in descending order
    const expenses = await prisma.expense.findMany({
      where: {
        createdBy: createdBy,
      },
      include: {
        budget_id: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the data to include budget name directly in each expense object
    const expensesWithBudgetName = expenses.map(expense => ({
      id: expense.id,
      name: expense.name,
      amount: expense.amount,
      createdBy: expense.createdBy,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
      budgetName: expense.budget_id.name,
    }));

    return NextResponse.json(expensesWithBudgetName, { status: 200 });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}
