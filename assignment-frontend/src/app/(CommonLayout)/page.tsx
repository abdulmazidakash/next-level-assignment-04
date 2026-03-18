/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroCarousel from "@/components/modules/home/Hero";
import TopRatedProviders from "@/components/modules/home/TopRatedProviders";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import MealCard from "@/components/modules/meal/MealCard";
import { getAllMeals } from "@/services/Meal";
import Link from "next/link";
import { UtensilsCrossed, ArrowRight } from "lucide-react";

export default async function Home() {
  const { data } = await getAllMeals();
  const featuredMeals = data?.slice(0, 3) ?? [];

  return (
    <div className="bg-[#f7f2ec]">

      {/* ── Hero ── */}
      <HeroCarousel />

      {/* ── Featured Meals ── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">

        {/* Section header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              Featured Meals
            </div>

            <h2 className="text-[clamp(1.8rem,4vw,2.4rem)] font-bold text-gray-900 leading-tight">
              Handpicked for{" "}
              <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                You
              </span>
            </h2>

            <p className="text-[14.5px] text-gray-400 mt-2 max-w-100 leading-relaxed">
              Fresh, delicious meals curated from our top-rated local restaurants
            </p>
          </div>

          {/* View all link */}
          <Link
            href="/meals"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-[13px] border border-gray-200 bg-white text-[13.5px] font-semibold text-gray-700 hover:border-orange-300 hover:bg-amber-50 hover:text-orange-600 transition-all whitespace-nowrap self-end"
          >
            Browse All Meals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Meal cards */}
        {featuredMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMeals.map((meal: any) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-black/[0.07] rounded-2xl p-14 text-center">
            <p className="text-gray-400 text-sm italic">No meals available right now. Check back soon!</p>
          </div>
        )}
      </section>

      {/* ── Top Rated Providers ── */}
      <TopRatedProviders />

      {/* ── Why Choose Us ── */}
      <WhyChooseUs />

    </div>
  );
}