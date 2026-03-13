import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.admin),
  CategoryController.createCategory
);

router.get("/", CategoryController.getCategories);

router.delete(
  "/:id",
  auth(UserRole.admin),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;