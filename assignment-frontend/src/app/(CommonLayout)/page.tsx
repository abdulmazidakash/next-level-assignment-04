/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroCarousel from "@/components/modules/home/Hero";
import TopRatedProviders from "@/components/modules/home/TopRatedProviders";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import MealCard from "@/components/modules/meal/MealCard";
import { getAllMeals } from "@/services/Meal";


export default async function Home() {
  
  const {data} = await getAllMeals();
  console.log(data)
  
  
  return (
   <>
    <HeroCarousel/>
     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.slice(0,3).map((meal: any) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
      <TopRatedProviders/>
      <WhyChooseUs/>
   </>
  );
}
