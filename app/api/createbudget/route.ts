import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST method handler
export async function POST(req: NextRequest) {
  try {
    const { name, amount, createdBy } = await req.json();

    if (!name || amount === undefined) {
      return NextResponse.json({ error: 'Name and amount are required' }, { status: 400 });
    }

    const newBudget = await prisma.budget.create({
      data: {
        name,
        amount: parseInt(amount, 10),
        createdBy,
        icon: '', // Add or modify as needed
      },
    });

    return NextResponse.json(newBudget, { status: 200 });
  } catch (error) {
    console.error('Error creating budget:', error);
    return NextResponse.json({ error: 'Failed to create budget' }, { status: 500 });
  }
}
