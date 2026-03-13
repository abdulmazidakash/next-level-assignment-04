import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get(
  "/orders",
  auth(UserRole.admin),
  AdminController.getAllOrders
);

export const AdminRoutes = router;