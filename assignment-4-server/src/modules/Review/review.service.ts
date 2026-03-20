import { prisma } from "../../lib/prisma";

const createReviewIntoDB = async (payload: any, userId: string) => {

  const meal = await prisma.meal.findUnique({
    where: { id: payload.mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  // check user ordered and delivered
  const hasOrdered = await prisma.orderItem.findFirst({
    where: {
      mealId: payload.mealId,
      order: {
        customerId: userId,
        status: "PLACED"
      }
    }
  });

  if (!hasOrdered) {
    throw new Error("You can review only after ordering");
  }

  // prevent duplicate review
  const existingReview = await prisma.review.findFirst({
    where: {
      mealId: payload.mealId,
      customerId: userId
    }
  });

  if (existingReview) {
    throw new Error("You already reviewed this meal");
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