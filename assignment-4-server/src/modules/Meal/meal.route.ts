import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { mealController } from './meal.controller';

const router = express.Router();

router.post('/',
    auth(UserRole.provider),
    mealController.createMeals
);
router.get("/",
    auth(UserRole.provider),
    mealController.getAllMeals
);
router.get(
  "/public",
  mealController.getPublicMeals
);
router.get(
  "/public/:id",
  mealController.getSingleMeals
);
router.get("/:id",
    auth(UserRole.provider),
    mealController.getSingleMeals
);
router.put(
    "/:id",
    auth(UserRole.provider),
    mealController.updateMeal
);
router.delete(
    "/:id",
    auth(UserRole.provider),
    mealController.deleteMeal
);

export const mealRoutes = router;
