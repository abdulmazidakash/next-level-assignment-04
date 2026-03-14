import express from 'express';
import { OrderController } from './order.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post('/' ,auth(UserRole.customer), OrderController.createOrder);
router.get("/all-orders", auth(UserRole.admin), OrderController.getAllOrders);
router.get("/", auth(UserRole.customer), OrderController.getMyOrders);
router.get("/:id", auth(UserRole.customer), OrderController.getSingleOrder);


export const OrderRoutes = router;
