import { prisma } from "../../lib/prisma";

const createReviewIntoDB = async (
  payload: any,
  userId: string
) => {

  const meal = await prisma.meal.findUnique({
    where: { id: payload.mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  const review = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      mealId: payload.mealId,
      customerId: userId,
    },
  });

  return review;
};

const getMealReviewsFromDB = async (mealId: string) => {
  return prisma.review.findMany({
    where: { mealId },
    include: {
      customer: true,
    },
  });
};

export const ReviewService = {
  createReviewIntoDB,
  getMealReviewsFromDB,
};