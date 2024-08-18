import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse the JSON body from the request
    const { createdBy } = await req.json();

    // Aggregate data with optional filter based on createdBy
    const totalBudgetValue = await prisma.budget.aggregate({
      _sum: {
        amount: true,
      },
      where: createdBy ? { createdBy } : undefined, // Apply filter if createdBy is provided
    });

    const totalNumberOfBudgets = await prisma.budget.count({
      where: createdBy ? { createdBy } : undefined, // Apply filter if createdBy is provided
    });

    const totalExpenseValue = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: createdBy ? { createdBy } : undefined, // Apply filter if createdBy is provided
    });

    // Return the aggregated data
    return NextResponse.json({
      totalBudgetValue: totalBudgetValue._sum.amount || 0,
      totalNumberOfBudgets,
      totalExpenseValue: totalExpenseValue._sum.amount || 0,
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 });
  }
}
