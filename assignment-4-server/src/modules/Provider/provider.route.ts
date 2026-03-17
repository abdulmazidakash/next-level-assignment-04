import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { ProviderController } from './provider.controller';

const router = express.Router();
router.get("/top",
    ProviderController.getTopRatedProviders
);
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
// provider can get their profile with meals count
router.get("/me",
    auth(UserRole.provider),
    ProviderController.getOwnProviders
);
router.patch(
    "/me",
    auth(UserRole.provider),
    ProviderController.updateProvider
)

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
