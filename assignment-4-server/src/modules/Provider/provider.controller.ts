import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ProviderService } from "./provider.service";


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


const getAllProviders = async (req: Request, res: Response) => {
  try {
    const result = await ProviderService.getAllProvidersIntoDB(req.user?.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Provider retrieved successfully",
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


export const ProviderController = {
  createProvider,
  getAllProviders,
  getSingleProvider,
};