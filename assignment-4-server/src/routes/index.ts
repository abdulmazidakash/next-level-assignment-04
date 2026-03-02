import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { mealRoutes } from "../modules/Meal/meal.route";
import { ProviderRoutes } from "../modules/Provider/provider.route";
import { OrderRoutes } from "../modules/Order/order.route";

const router = Router();

const routerManager = [
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/meals",
        route: mealRoutes,
    },
    {
        path: "/provider",
        route: ProviderRoutes,
    },
    {
        path: "/orders",
        route: OrderRoutes,
    }
];

routerManager.forEach((r) => router.use(r.path, r.route));
export default router;