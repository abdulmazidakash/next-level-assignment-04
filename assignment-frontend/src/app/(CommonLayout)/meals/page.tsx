/* eslint-disable @typescript-eslint/no-explicit-any */
import MealCard from "@/components/modules/meal/MealCard";
import { getAllMeals } from "@/services/Meal";
import { UtensilsCrossed } from "lucide-react";

export default async function MealsPage() {
  const { data } = await getAllMeals();

  return (
    <section className="min-h-screen bg-linear-to-b from-orange-50/60 via-white to-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Page Header ── */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-400 mb-2">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              Our Menu
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Today&apos;s Meals
            </h1>
          </div>

          {data?.length > 0 && (
            <p className="text-sm text-gray-400 font-medium sm:mb-1">
              {data.length} item{data.length !== 1 ? "s" : ""} available
            </p>
          )}
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-linear-to-r from-red-200 via-orange-100 to-transparent mb-10" />

        {/* ── Meal Grid ── */}
        {data?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((meal: any, index: number) => (
              <div
                key={meal.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
              >
                <MealCard meal={meal} />
              </div>
            ))}
          </div>
        ) : (
          /* ── Empty State ── */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4 shadow-inner">
              <UtensilsCrossed className="h-7 w-7 text-red-300" />
            </div>
            <h2 className="text-lg font-bold text-gray-700 mb-1">No meals available</h2>
            <p className="text-sm text-gray-400 max-w-xs">
              Check back soon — the kitchen is being stocked with delicious options.
            </p>
          </div>
        )}
      </div>

      {/* ── Fade-in animation keyframes ── */}
      {/* <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out;
        }
      `}</style> */}
    </section>
  );
}