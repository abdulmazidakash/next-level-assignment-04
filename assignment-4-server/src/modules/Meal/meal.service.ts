import { prisma } from "../../lib/prisma";

const createMealIntoDB = async (payload: any, userId: string) => {
  const providerProfile = await prisma.providerProfiles.findUnique({
    where: {
      providerId: userId,
    }
  });

  // if (!providerProfile || user.role !== "PROVIDER") {
  //   throw new Error("Only providers can create meals");
  // }

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  // if (!payload.categoryId) {
  //   throw new Error("Category is required");
  // }

  // const categoryExists = await prisma.category.findUnique({
  //   where: { id: payload.categoryId }
  // });

  // if (!categoryExists) {
  //   throw new Error("Invalid category");
  // }

  const result = await prisma.meal.create({
    data: {
      ...payload,
      providerId: providerProfile.id,
    },
  });

  return result;
};


const getAllMealsIntoDB = async (userId: string) => {
  const providerProfile = await prisma.providerProfiles.findUnique({
    where: {
      providerId: userId,
    },
  });

  if (!providerProfile) {
    throw new Error("Provider Profile not found");
  }

  const result = await prisma.meal.findMany({
    where: {
      providerId: providerProfile.id,
    },
    include: {
      provider: true,
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