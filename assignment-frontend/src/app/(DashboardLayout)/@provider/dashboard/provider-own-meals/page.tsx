import ProviderMealsTable from "@/components/modules/provider/ProviderMealsTable";
import { getProviderMeals } from "@/services/provider";


export default async function ProviderMealsPage() {
  const res = await getProviderMeals();
  const meals = res?.data || [];

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">My Meals</h1>

      <ProviderMealsTable meals={meals} />
    </div>
  );
}