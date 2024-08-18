import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const budgetId = parseInt(params.id, 10);
  console.log(budgetId);

  if (!budgetId) {
    return NextResponse.json({ error: 'Invalid budget ID' }, { status: 400 });
  }

  try {
    await prisma.expense.deleteMany({
      where: { budgetId },
    });
    
    await prisma.budget.delete({
      where: { id: budgetId },
    });
    return NextResponse.json({ message: 'Budget deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting budget:', error);
    return NextResponse.json({ error: 'Failed to delete budget' }, { status: 500 });
  }
}
