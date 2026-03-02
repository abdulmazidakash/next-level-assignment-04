import express from 'express';
import { OrderController } from './order.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post('/' ,auth(UserRole.customer), OrderController.createOrder)

export const OrderRoutes = router;
