import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const createUser = async(req: Request, res: Response) =>{
    // console.log(req)
    try {
    const result = await AuthService.createUserIntoDB(req.body);

   res.status(201).json({
    success: true,
    message: "user created successfully",
    data: result,
   })
  } catch (error: any) {
    console.log(error)
  }
}

export const AuthController = {
    // Add controller methods here
    createUser
    };