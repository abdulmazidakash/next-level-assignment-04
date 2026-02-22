import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { mealController } from './meal.controller';

const router = express.Router();

router.post('/', auth(UserRole.provider), mealController.createMeals)

export const mealRoutes = router;
