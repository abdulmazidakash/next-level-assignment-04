import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ProviderService } from "./provider.service";

// -------- CREATE PROVIDER --------
const createProvider = async (req: Request, res: Response) => {
  try {
    const result = await ProviderService.createProviderIntoDB(req.body, req.user?.id!);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Provider created successfully",
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

// -------- GET ALL PROVIDERS --------
const getAllProviders = async (_req: Request, res: Response) => {
  try {
    const result = await ProviderService.getAllProvidersIntoDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Providers retrieved successfully",
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

// -------- GET SINGLE PROVIDER --------
const getSingleProvider = async (req: Request, res: Response) => {
  try {
    const result = await ProviderService.getSingleProviderIntoDB(req.params.id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Provider retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: error.message || "Provider not found",
      data: null,
    });
  }
};

// -------- EXPORT CONTROLLER --------
export const ProviderController = {
  createProvider,
  getAllProviders,
  getSingleProvider,
};