import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {

  const userId = req.user?.id;
  const payload = req.body;

  const result = await ReviewService.createReviewIntoDB(
    payload,
    userId
  );

  res.status(200).json({
    success: true,
    message: "Review added successfully",
    data: result
  });
};

const getMealReviews = async (req: Request, res: Response) => {

  const { mealId } = req.params;

  const result = await ReviewService.getMealReviewsFromDB(mealId as string);

  res.status(200).json({
    success: true,
    data: result
  });
};

export const ReviewController = {
  createReview,
  getMealReviews
};