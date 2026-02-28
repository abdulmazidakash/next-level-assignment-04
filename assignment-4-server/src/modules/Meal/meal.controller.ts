import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { mealService } from "./meal.service";

const createMeals = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      throw new Error("Unauthorized user");
    }

    const result = await mealService.createMealIntoDB(
      req.body,
      req.user.id
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Meal created successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to create meal",
      data: null,
    });
  }
};

const getAllMeals = async (req: Request, res: Response) => {
  try {
    const result = await mealService.getAllMealsIntoDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Meals retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to retrieve meals",
      data: null,
    });
  }
};

const getSingleMeals = async (req: Request, res: Response) => {
  try {
    const result = await mealService.getSingleMealIntoDB(
      req.params.id as string
    );

    if (!result) {
      throw new Error("Meal not found");
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Meal retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: error?.message || "Meal not found",
      data: null,
    });
  }
};


export const mealController = {
  createMeals,
  getAllMeals,
  getSingleMeals,
    // Add controller methods here
    };