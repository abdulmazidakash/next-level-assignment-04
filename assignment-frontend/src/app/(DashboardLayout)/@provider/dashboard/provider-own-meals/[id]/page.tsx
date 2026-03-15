import { getSingleMeal } from "@/services/Meal";
import UpdateMealForm from "@/components/form/UpdateMealForm";

export default async function ProviderOwnMealDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const mealRes = await getSingleMeal(id);
  const meal = mealRes?.data;

  if (!meal) {
    return (
      <div className="text-center py-20">
        Meal not found
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <UpdateMealForm meal={meal} />
    </div>
  );
}