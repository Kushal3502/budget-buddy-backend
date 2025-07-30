import { prisma } from "../../config/db";

export async function fetchByMonth(userId: string) {
  return await prisma.$queryRaw`SELECT 
        TO_CHAR("createdAt", 'YYYY-MM') AS month,
        SUM("amount") AS total
        FROM "Expense"
        WHERE "userId" = ${userId}
        GROUP BY month
        ORDER BY month;
    `;
}

export async function fetchByCategory(userId: string) {
  return await prisma.$queryRaw`SELECT 
        TO_CHAR("createdAt", 'YYYY-MM') AS month, "categoryId",
        SUM("amount") AS total
        FROM "Expense"
        WHERE "userId" = ${userId}
        GROUP BY month, "categoryId"
        ORDER BY month DESC, total DESC;
    `;
}
