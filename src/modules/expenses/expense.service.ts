import { prisma } from "../../config/db";

export async function addExpense(
  userId: string,
  categoryId: string,
  note: string,
  amount: number,
  mode: string,
  date: Date
) {
  // check if valid category
  const category = await prisma.category.findFirst({
    where: {
      AND: [{ id: categoryId }, { userId }],
    },
  });

  if (!category) return {};

  return await prisma.expense.create({
    data: {
      amount,
      mode,
      categoryId,
      userId,
      note,
    },
  });
}

export async function fetchAll(userId: string) {
  return await prisma.expense.findMany({
    where: { userId },
  });
}

export async function fetchById(userId: string, expenseId: string) {
  return await prisma.expense.findUnique({
    where: {
      userId,
      id: expenseId,
    },
  });
}

export async function updateExpense(
  userId: string,
  expenseId: string,
  data: {
    amount?: number;
    note?: string;
    mode?: string;
    categoryId?: string;
    date?: string;
  }
) {
  return await prisma.expense.update({
    where: { id: expenseId, userId },
    data,
  });
}

export async function deleteExpense(userId: string, expenseId: string) {
  await prisma.expense.delete({
    where: { id: expenseId, userId },
  });
}
