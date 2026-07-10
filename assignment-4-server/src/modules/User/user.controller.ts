import { Request, Response } from "express";
import { Status } from "../../../generated/prisma/enums";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersFromDB();

    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      httpStatusCode: 400,
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
      httpStatusCode: 200,
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message: error?.message || "Failed to update user status",
      data: null,
    });
  }
};

const updateUserRole = async (req: Request, res: Response) => {
  console.log('update user role data request: ===>',req.body);
  console.log('update user role data request id: ===>',req.params.id);
  try {
    const { id } = req.params;
    const { role } = req.body;

    const result = await UserService.updateUserRoleIntoDB(id as string, role);

    sendResponse(res, {
      httpStatusCode: 400,
      success: true,
      message: "Role Updated Successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message: error?.message || "Failed to update user status",
      data: null,
    });
  }
};

export const UserController = {
  getAllUsers,
  updateUserStatus,
  updateUserRole
};