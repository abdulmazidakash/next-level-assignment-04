import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { mealController } from './meal.controller';

const router = express.Router();

router.post('/', auth(UserRole.provider), mealController.createMeals);
router.get("/", auth(UserRole.provider), mealController.getAllMeals);
router.get("/:id", auth(UserRole.provider), mealController.getSingleMeals);
export const mealRoutes = router;
