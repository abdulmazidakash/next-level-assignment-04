
import { getSinglePublicMeal } from "@/services/Meal";
import MealDetails from "@/components/modules/meal/MealDetails";
import ReviewForm from "@/components/modules/review/ReviewForm";


export default async function MealDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const mealRes = await getSinglePublicMeal(id);
  const meal = mealRes?.data;

  console.log('meal details : ===>',meal)

  if (!meal) {
    return <div className="text-center py-20">Meal not found</div>;
  }

  return (
    <>
      <MealDetails meal={meal} />
      <h2 className="text-2xl font-semibold mb-4">Write Review</h2>

      <ReviewForm mealId={meal.id} />
    </>
  );
}