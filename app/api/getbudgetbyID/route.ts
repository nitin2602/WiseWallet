import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { id, createdBy } = await req.json();
  console.log(createdBy,id);
  if (!id || !createdBy) {
    return NextResponse.json({ error: 'Budget ID and createdBy are required' }, { status: 400 });
  }

  try {
    const budget = await prisma.budget.findFirst({
      where: {
        id: parseInt(id, 10),
        createdBy,
      },
      include: {
        expenses: true, // Include related expenses
      },
    });

    if (!budget) {
      return NextResponse.json({ error: 'Budget not found or access denied' }, { status: 404 });
    }

    return NextResponse.json(budget, { status: 200 });
  } catch (error) {
    console.error('Error fetching budget:', error);
    return NextResponse.json({ error: 'Failed to fetch budget' }, { status: 500 });
  }
}
