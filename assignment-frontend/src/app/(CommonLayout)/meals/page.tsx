/* eslint-disable @typescript-eslint/no-explicit-any */
import MealsFilter from "@/components/modules/meal/MealsFilter";
import { getAllMeals } from "@/services/Meal";
import { UtensilsCrossed, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function MealsPage() {
  const { data } = await getAllMeals();
  const meals = data ?? [];

  return (
    <div className="min-h-screen bg-[#f7f2ec]">
      <div className="max-w-275 mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Page header ── */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-3">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              Our Menu
            </div>

            <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-900 leading-tight">
              Today&apos;s{" "}
              <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                Meals
              </span>
            </h1>

            {meals.length > 0 && (
              <p className="text-[13.5px] text-gray-400 mt-2">
                {meals.length} item{meals.length !== 1 ? "s" : ""} available
              </p>
            )}
          </div>

          <Link
            href="/providers"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-[13px] border border-gray-200 bg-white text-[13.5px] font-semibold text-gray-700 hover:border-orange-300 hover:bg-amber-50 hover:text-orange-600 transition-all whitespace-nowrap self-end"
          >
            Browse Providers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Divider ── */}
        <div
          className="h-px mb-8"
          style={{ background: "linear-gradient(to right, #fdba74, #fed7aa, transparent)" }}
        />

        {/* ── Search + filter + grid ── */}
        <MealsFilter meals={meals} />

      </div>
    </div>
  );
}