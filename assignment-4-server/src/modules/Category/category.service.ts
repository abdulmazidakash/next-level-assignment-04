import { prisma } from "../../lib/prisma";

const createCategoryIntoDB = async (payload: { name: string }) => {
  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

const getAllCategoriesFromDB = async () => {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

const deleteCategoryFromDB = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  await prisma.category.delete({
    where: { id },
  });

  return null;
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  deleteCategoryFromDB,
};