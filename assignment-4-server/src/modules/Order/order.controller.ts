import { Request, Response } from "express";
import { OrderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";

// ✅ Create Order (Customer Only)
const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.createOrderIntoDB(
      req.body,
      req.user?.id as string
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Order placed successfully",
      data: result,
    });

  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to place order",
      data: null,
    });
  }
};


// ✅ Get My Orders (Customer)
const getMyOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getMyOrdersFromDB(
      req.user?.id as string
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "My Orders retrieved successfully",
      data: result,
    });

  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to retrieve orders",
      data: null,
    });
  }
};


// ✅ Get Single Order (Customer)
const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getSingleOrderFromDB(
      req.params.id as string,
      req.user?.id as string
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order Details retrieved successfully",
      data: result,
    });

  } catch (error: any) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: error?.message || "Order Details not found",
      data: null,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrdersFromDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All Orders retrieved successfully",
      data: result,
    });

  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to retrieve orders",
      data: null,
    });
  }
};


export const OrderController = {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
};