import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { mealController } from './meal.controller';

const router = express.Router();

router.post('/', auth(UserRole.customer), mealController.createMeals);
router.get("/", auth(UserRole.customer), mealController.getAllMeals);
router.get("/:id", auth(UserRole.customer), mealController.getSingleMeals);

export const mealRoutes = router;
