import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { mealService } from "./meal.service";

const createMeals = async (req: Request, res: Response) => {
  try {
    const result = await mealService.createMealIntoDB(
      req.body,
      req.user?.id
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
    const result = await mealService.getAllMealsIntoDB(req.user?.id);

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
      throw new Error("Meal Details not found");
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Meal Details retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: error?.message || "Meal Details not found",
      data: null,
    });
  }
};


const updateMeal = async (req: Request, res: Response) => {
  try {
    const result = await mealService.updateMealIntoDB(
      req.params.id as string,
      req.body,
      req.user?.id as string
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Meal updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to update meal",
      data: null,
    });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  try {
    await mealService.deleteMealFromDB(
      req.params.id as string,
      req.user?.id as string
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Meal deleted successfully",
      data: null,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to delete meal",
      data: null,
    });
  }
};

export const mealController = {
  createMeals,
  getAllMeals,
  getSingleMeals,
  updateMeal,
  deleteMeal

  // Add controller methods here
};