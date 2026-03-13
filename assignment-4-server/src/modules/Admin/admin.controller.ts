import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllOrders = async (req: Request, res: Response) => {
  const result = await AdminService.getAllOrdersFromDB();

  res.json({
    success: true,
    data: result,
  });
};

export const AdminController = {
  getAllOrders,
};