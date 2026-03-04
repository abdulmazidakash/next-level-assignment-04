
import { getSinglePublicMeal } from "@/services/Meal";
import MealDetails from "@/components/modules/meal/MealDetails";

export default async function MealDetailsPage({
  params,
}: {
  params: { id: string };
}) {
    const {id} = await  params;
  const mealRes = await getSinglePublicMeal(id);
  const meal = mealRes?.data;

  if (!meal) {
    return <div className="text-center py-20">Meal not found</div>;
  }

  return (
    <>
        <MealDetails meal={meal}/>
    </>
  );
}