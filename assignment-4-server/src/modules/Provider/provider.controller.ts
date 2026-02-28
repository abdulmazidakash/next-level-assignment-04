import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ProviderService } from "./provider.service";

const createProviders = async (req: Request, res: Response) => {
  // console.log(req)
  try {
    const result = await ProviderService.createProviderIntoDB(req.body, req.user?.id);
    // console.log('controller meal', req.body)
    // const result ='';

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Provider created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error)
  }
};

const getAllProviders = async (req: Request, res: Response) => {
  try {
    const result = await ProviderService.getAllProvidersIntoDB(req.user?.id);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Providers retrieved Successfully.",
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

const getSingleProviders = async (req: Request, res: Response) => {
  try {
    const result = await ProviderService.getSingleProviderIntoDB(req.params?.id as string);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Providers retrieved Successfully.",
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

export const ProviderController = {
    // Add controller methods here

    createProviders,
    getAllProviders,
    getSingleProviders,
    };