import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { createdBy, budgetId } = await req.json();

  if (!createdBy || !budgetId) {
    return NextResponse.json({ error: 'createdBy and budgetId are required' }, { status: 400 });
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        budgetId: parseInt(budgetId, 10),
        createdBy
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}
