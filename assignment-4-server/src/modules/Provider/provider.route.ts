import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { ProviderController } from './provider.controller';

const router = express.Router();

router.post('/', auth(UserRole.provider), ProviderController.createProviders);
router.get("/", auth(UserRole.provider), ProviderController.getAllProviders);
router.get("/:id", auth(UserRole.provider), ProviderController.getSingleProviders);

export const ProviderRoutes = router;
