import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { ProviderController } from './provider.controller';

const router = express.Router();

// public providers with meals count
router.get("/public",
    ProviderController.getPublicProviders
);

// single provider with meals
router.get("/public/:id",
    ProviderController.getSingleProvider
);
// provider can create their profile
router.post('/',
    auth(UserRole.provider),
    ProviderController.createProvider
);

router.get("/",
    ProviderController.getAllProviders
);

// provider can get their profile with meals count
router.get("/me",
    auth(UserRole.provider),
    ProviderController.getOwnProviders
);

// update order status by provider
router.patch("/order/:id",
    auth(UserRole.provider),
    ProviderController.updateOrderStatus
);

// get provider incoming orders
router.get("/orders",
    auth(UserRole.provider),
    ProviderController.getProviderOrders
);

router.get("/:id",
    auth(UserRole.provider),
    ProviderController.getSingleProvider
);

export const ProviderRoutes = router;
