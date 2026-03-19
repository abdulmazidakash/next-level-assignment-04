import ProviderMealsTable from "@/components/modules/provider/ProviderMealsTable"
import { getProviderMeals } from "@/services/provider"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function ProviderMealsPage() {
  const res   = await getProviderMeals()
  const meals = res?.data || [];

  console.log('provider own meals: ===>', meals)

  const available   = meals.filter((m: any) => m.isAvailable !== false).length
  const unavailable = meals.length - available
  const avgPrice    = meals.length
    ? Math.round(meals.reduce((s: number, m: any) => s + (m.price ?? 0), 0) / meals.length)
    : 0

  return (
    <div className="min-h-screen bg-[#f7f2ec] rounded-xl">
      <div className="max-w-250 mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-7">

        {/* ── Header ── */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className=" text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              My{" "}
              <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                Meals
              </span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">Manage all meals on your restaurant menu</p>
          </div>

          <Link
            href="/dashboard/add-meal"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-xl border-none bg-linear-to-br from-orange-500 to-rose-600 text-white text-[13.5px] font-semibold shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Add Meal
          </Link>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Meals",  value: meals.length, sub: "on menu" },
            { label: "Available",    value: available,    sub: "orderable now" },
            { label: "Unavailable",  value: unavailable,  sub: "hidden from menu" },
            { label: "Avg Price",    value: `৳${avgPrice}`, sub: "per meal" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white border border-black/[0.07] rounded-2xl px-4 py-4">
              <p className="text-[10.5px] font-bold tracking-widest uppercase text-gray-400 mb-1">{label}</p>
              <p className=" text-[1.55rem] font-bold text-gray-900 leading-none">
                {value}
              </p>
              <p className="text-[11.5px] text-gray-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <ProviderMealsTable meals={meals} />

      </div>
    </div>
  )
}