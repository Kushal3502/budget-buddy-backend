import { prisma } from "../../config/db";

export async function getAllCategories(userId: string | undefined) {
  return await prisma.category.findMany({
    where: {
      OR: [{ userId }, { userId: null }],
    },
  });
}

export async function createCategory(userId: string, name: string) {
  return await prisma.category.create({
    data: {
      userId,
      name,
    },
  });
}

export async function deleteCategory(id: string, userId: string) {
  await prisma.category.delete({
    where: {
      userId,
      id,
    },
  });
}
