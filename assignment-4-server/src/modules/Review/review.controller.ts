import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import sendResponse from "../../utils/sendResponse";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const payload = req.body;

    const result = await ReviewService.createReviewIntoDB(
      payload,
      userId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review added successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Something went wrong",
      data: null,
    });
  }
};

const getMealReviews = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;

    const result = await ReviewService.getMealReviewsFromDB(mealId as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Something went wrong",
      data: null,
    });
  }
};

export const ReviewController = {
  createReview,
  getMealReviews
};