import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.customer),
  ReviewController.createReview
);

router.get("/:mealId", ReviewController.getMealReviews);

export const ReviewRoutes = router;