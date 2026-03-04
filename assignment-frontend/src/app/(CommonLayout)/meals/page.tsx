/* eslint-disable @typescript-eslint/no-explicit-any */
import MealCard from "@/components/modules/meal/MealCard";
import { getAllMeals } from "@/services/Meal";


export default async function MealsPage() {
  
  const {data} = await getAllMeals();
  console.log(data)
  
  
  return (
   <>
     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((meal: any) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
   </>
  );
}
