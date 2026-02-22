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
      message: "Meal created",
      data: result,
    });
  } catch (error: any) {
    console.log(error)
  }
}

export const mealController = {
  createMeals,
    // Add controller methods here
    };