import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { mealService } from "./meal.service";

const createMeals = async (req: Request, res: Response) => {
  // console.log(req)
  try {
    const result = await mealService.createMealIntoDB(req.body, req.user?.id);
    // console.log('controller meal', req.body)
    // const result ='';

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Meal created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error)
  }
};

const getAllMeals = async (req: Request, res: Response) => {
  try {
    const result = await mealService.getAllMealsIntoDB(req.user?.id);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Meals retrieved Successfully.",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};

const getSingleMeals = async (req: Request, res: Response) => {
  try {
    const result = await mealService.getSingleMealIntoDB(req.params?.id as string);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Meals retrieved Successfully.",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: error?.message || "Something went wrong!!",
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