import { prisma } from "../../lib/prisma";

const createMealIntoDB = async (payload: any, userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("Invalid user");
    }

    const result = await prisma.meal.create({
        data: {
            ...payload,
            customerId: userId
        },
    });

    return result;
};

const getAllMealsIntoDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("User not found!!");
  }

  const result = await prisma.meal.findMany({
    where: {
      customerId: user.id,
    },
  });

  return result;
};

const getSingleMealIntoDB = async (mealId: string) => {
  const result = await prisma.meal.findUnique({
    where: {
      id: mealId,
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