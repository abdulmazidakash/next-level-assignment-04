import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response) => {
  // console.log(req)
  try {
    const result = await AuthService.createUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created",
      data: result,
    });
  } catch (error: any) {
    console.log(error)
  }
}


const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUserIntoDB(req.body);

    res.cookie("token", result.token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict", // none / strict / lax
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error)
  }
};

const getMe = async (req: any, res: Response) => {
  try {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User fetched successfully",
      data: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const AuthController = {
  // Add controller methods here
  createUser,
  loginUser,
  getMe,
};