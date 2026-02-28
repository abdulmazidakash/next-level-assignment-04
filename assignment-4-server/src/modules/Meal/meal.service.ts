import { prisma } from "../../lib/prisma";

const createMealIntoDB = async (payload: any, userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { providerProfile: true },
  });

  if (!user || user.role !== "PROVIDER") {
    throw new Error("Only providers can create meals");
  }

  if (!user.providerProfile) {
    throw new Error("Provider profile not found");
  }

  const result = await prisma.meal.create({
    data: {
      ...payload,
      providerId: user.providerProfile.id,
    },
  });

  return result;
};
const getAllMealsIntoDB = async () => {
  const result = await prisma.meal.findMany({
    include: {
      provider: true,
      category: true,
    },
  });

  return result;
};

const getSingleMealIntoDB = async (mealId: string) => {
  const result = await prisma.meal.findUnique({
    where: { id: mealId },
    include: {
      provider: true,
      category: true,
      reviews: true,
    },
  });

  return result;
};

export const mealService = {
  // Add service methods here
  createMealIntoDB,
  getAllMealsIntoDB,
  getSingleMealIntoDB,
};