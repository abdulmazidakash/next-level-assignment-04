import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { Status } from "../../../generated/prisma/enums";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersFromDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to retrieve users",
      data: null,
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    // ✅ Validate enum value
    if (!Object.values(Status).includes(status)) {
      throw new Error("Invalid status value");
    }

    const result = await UserService.updateUserStatusIntoDB(
      req.params.id as string,
      status
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to update user status",
      data: null,
    });
  }
};

export const UserController = {
  getAllUsers,
  updateUserStatus,
};