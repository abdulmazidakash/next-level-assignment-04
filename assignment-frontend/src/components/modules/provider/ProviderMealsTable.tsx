/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image"
import Link from "next/link"
import { Eye, Pencil, Trash2, UtensilsCrossed } from "lucide-react"
import ViewMealDialog from "./ViewMealDialog"
import { cn } from "@/lib/utils"
import DeleteMealDialog from "@/components/dialog/DeleteMealDialog"

export default function ProviderMealsTable({ meals }: any) {
  if (!meals?.length) {
    return (
      <div className="bg-white border border-black/[0.07] rounded-2xl p-14 flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
          <UtensilsCrossed className="h-6 w-6 text-amber-700" />
        </div>
        <p className=" text-lg font-bold text-gray-900">
          No meals yet
        </p>
        <p className="text-sm text-gray-400">Add your first meal to start receiving orders.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#faf7f3]">
              {["#", "Meal", "Price", "Status", "Actions"].map((h, i) => (
                <th
                  key={h}
                  className={cn(
                    "px-4 py-3 text-left text-[10.5px] font-bold tracking-[0.06em] uppercase text-gray-400 border-b border-gray-100 whitespace-nowrap",
                    i === 0 && "w-12 text-center"
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {meals.map((meal: any, i: number) => (
              <tr
                key={meal.id}
                className={cn(
                  "border-b border-gray-50 last:border-0 transition-colors",
                  meal.isAvailable === false
                    ? "opacity-60 hover:opacity-80 hover:bg-[#fdf9f5]"
                    : "hover:bg-[#fdf9f5]"
                )}
              >
                {/* # */}
                <td className="px-4 py-4 text-center text-xs text-gray-400 font-semibold">
                  {i + 1}
                </td>

                {/* Meal image + name */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-13 h-11 rounded-xl overflow-hidden shrink-0">
                      {meal.imageUrl ? (
                        <Image
                          src={meal.imageUrl}
                          alt={meal.name}
                          fill
                          className="object-cover"
                          sizes="52px"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center">
                          <UtensilsCrossed className="h-5 w-5 text-white opacity-80" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-[14px] text-gray-900 leading-tight">{meal.name}</p>
                      {meal.category?.name && (
                        <p className="text-[11.5px] text-gray-400 mt-0.5">{meal.category.name}</p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="px-4 py-4">
                  <span className=" text-[.95rem] font-bold text-gray-900">
                    ৳{meal.price}
                  </span>
                </td>

                {/* Availability */}
                <td className="px-4 py-4">
                  {meal.isAvailable !== false ? (
                    <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[11.5px] font-semibold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-[11.5px] font-semibold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      Unavailable
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* View */}
                    <ViewMealDialog meal={meal} />

                    {/* Update */}
                    <Link
                      href={`/provider-dashboard/provider-own-meals/${meal.id}`}
                      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[9px] border-[1.5px] border-red-200 bg-red-50 text-red-500 text-[12px] font-semibold hover:bg-red-100 hover:border-red-300 hover:-translate-y-0.5 transition-all"
                    >
                      <Pencil className="h-3 w-3" />
                      
                    </Link>

                    {/* Delete */}
                    <DeleteMealDialog id={meal.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}