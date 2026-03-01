import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { mealRoutes } from "../modules/Meal/meal.route";
import { ProviderRoutes } from "../modules/Provider/provider.route";

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
    }
];

routerManager.forEach((r) => router.use(r.path, r.route));
export default router;