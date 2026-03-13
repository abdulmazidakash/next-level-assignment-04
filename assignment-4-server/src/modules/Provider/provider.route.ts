import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { ProviderController } from './provider.controller';

const router = express.Router();
router.get("/public", 
    ProviderController.getPublicProviders
);
router.get("/public/:id", 
    ProviderController.getSingleProvider
);
router.post('/',
    auth(UserRole.provider),
    ProviderController.createProvider
);
router.get("/",
    ProviderController.getAllProviders
);
router.get("/:id",
    auth(UserRole.provider),
    ProviderController.getSingleProvider
);
router.patch("/order/:id",
    auth(UserRole.provider),
    ProviderController.updateOrderStatus
);

export const ProviderRoutes = router;
