import { Request, Response } from "express";
import httpStatus from "http-status";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";

const createCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
};

const getCategories = async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategoriesFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Categories fetched successfully",
    data: result,
  });
};

const deleteCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.deleteCategoryFromDB(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category deleted successfully",
    data: result,
  });
};

export const CategoryController = {
  createCategory,
  getCategories,
  deleteCategory,
};