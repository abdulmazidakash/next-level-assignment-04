import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const result = await ReviewService.createReviewIntoDB(
    req.body,
    userId
  );

  res.json({
    success: true,
    message: "Review created",
    data: result,
  });
};

const getMealReviews = async (req: Request, res: Response) => {
  const result = await ReviewService.getMealReviewsFromDB(
    req.params.mealId as string
  );

  res.json({
    success: true,
    data: result,
  });
};

export const ReviewController = {
  createReview,
  getMealReviews,
};