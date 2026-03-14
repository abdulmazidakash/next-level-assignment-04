
import { getSingleMeal } from "@/services/Meal";
import MealDetails from "@/components/modules/meal/MealDetails";

export default async function ProviderOwnMealDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const mealRes = await getSingleMeal(id);
    console.log('provider own meals details page ===>', mealRes)
    const meal = mealRes?.data;

    if (!meal) {
        return <div className="text-center py-20">Meal not found</div>;
    }

    return (
        <>
            <MealDetails meal={meal} />
        </>
    );
}