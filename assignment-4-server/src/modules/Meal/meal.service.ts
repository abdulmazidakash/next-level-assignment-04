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
            providerId: userId
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
      providerId: user.id,
    },
  });

  return result;
};

export const mealService = {
    // Add service methods here
    createMealIntoDB,
    getAllMealsIntoDB,
};