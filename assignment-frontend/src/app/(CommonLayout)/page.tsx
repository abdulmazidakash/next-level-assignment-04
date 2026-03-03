/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroCarousel from "@/components/modules/home/Hero";
import MealCard from "@/components/modules/meal/MealCard";
import { getAllMeals } from "@/services/Meal";


export default async function Home() {
  
  const meals = await getAllMeals();
  console.log(meals)
  
  
  return (
   <>
    <HeroCarousel/>
     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {meals?.data?.map((meal: any) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
   </>
  );
}
