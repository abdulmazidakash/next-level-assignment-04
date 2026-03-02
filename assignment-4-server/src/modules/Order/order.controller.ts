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
      message: "Orders retrieved successfully",
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
      req.params.id,
      req.user?.id as string
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order retrieved successfully",
      data: result,
    });

  } catch (error: any) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: error?.message || "Order not found",
      data: null,
    });
  }
};


export const OrderController = {
  createOrder,
  getMyOrders,
  getSingleOrder,
};