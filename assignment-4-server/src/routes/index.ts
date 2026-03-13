import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { mealRoutes } from "../modules/Meal/meal.route";
import { ProviderRoutes } from "../modules/Provider/provider.route";
import { OrderRoutes } from "../modules/Order/order.route";
import { UserRoutes } from "../modules/User/user.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { ReviewRoutes } from "../modules/Review/review.route";
import { AdminRoutes } from "../modules/Admin/admin.route";

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
    },
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/categories",
        route: CategoryRoutes,
    },
    {
        path: "/reviews",
        route: ReviewRoutes,
    },
    {
        path: "/admin",
        route: AdminRoutes,
    }

];

routerManager.forEach((r) => router.use(r.path, r.route));
export default router;