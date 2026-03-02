import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { ProviderController } from './provider.controller';

const router = express.Router();

router.post('/', auth(UserRole.provider), ProviderController.createProvider);
router.get("/", auth(UserRole.provider), ProviderController.getAllProviders);
router.get("/:id", auth(UserRole.provider), ProviderController.getSingleProvider);


router.patch("/order/:id", auth(UserRole.provider), ProviderController.updateOrderStatus);

export const ProviderRoutes = router;
