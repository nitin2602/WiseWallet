import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, amount, createdBy, budgetID } = await req.json();

  if (!name || !amount || !createdBy || !budgetID) {
    return NextResponse.json({ error: 'Name, amount, createdBy, and budgetId are required' }, { status: 400 });
  }

  try {
    const newExpense = await prisma.expense.create({
      data: {
        name,
        amount,
        createdBy,
        budgetId: parseInt(budgetID, 10),
      },
    });

    return NextResponse.json(newExpense, { status: 200 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
  }
}
