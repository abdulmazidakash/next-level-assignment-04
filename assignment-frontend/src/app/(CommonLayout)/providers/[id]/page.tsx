/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import Link from "next/link"
import { MapPin, User, UtensilsCrossed, Star, ShoppingCart, AlertCircle, Eye } from "lucide-react"
import { getSinglePublicProvider } from "@/services/provider"
import { addToCart } from "@/lib/cart"          // used by client wrapper — see note below
import { cn } from "@/lib/utils"

interface PageProps {
  params: Promise<{ id: string }>
}

// Availability label + style helper
function AvailBadge({ available }: { available: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        available ? "text-green-700" : "text-red-700"
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full flex-shrink-0",
          available ? "bg-green-500" : "bg-red-400"
        )}
      />
      {available ? "Available" : "Out of stock"}
    </span>
  )
}

export default async function ProviderPage({ params }: PageProps) {
  const { id } = await params
  const result = await getSinglePublicProvider(id)
  const provider = result?.data

  if (!provider) {
    return (
      <div className="min-h-screen bg-[#f7f2ec] flex items-center justify-center">
        <p className="text-gray-400 text-sm italic">Provider not found</p>
      </div>
    )
  }

  const meals = provider.meals ?? []
  const availableCount = meals.filter((m: any) => m.isAvailable !== false).length

  return (
    <div className="min-h-screen bg-[#f7f2ec]">

      {/* ── HERO ── */}
      <div className="relative h-[260px] sm:h-[300px] overflow-hidden">
        {provider.coverImage ? (
          <Image
            src={provider.coverImage}
            alt={provider.restaurantName}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          /* Decorative fallback */
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-7 flex flex-col gap-2.5">
          {/* Cuisine pill */}
          <span className="self-start bg-gradient-to-r from-orange-500 to-rose-600 text-white text-[10.5px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
            {provider.cuisineType}
          </span>

          {/* Name */}
          <h1 className="font-[family-name:var(--font-display,serif)] text-3xl sm:text-4xl font-bold text-white leading-tight drop-shadow-md">
            {provider.restaurantName}
          </h1>

          {/* Meta pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            {provider.user?.name && (
              <span className="flex items-center gap-1.5 bg-white/12 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-[12px] text-white font-medium">
                <User className="h-3 w-3 opacity-75" />
                {provider.user.name}
              </span>
            )}
            {provider.address && (
              <span className="flex items-center gap-1.5 bg-white/12 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-[12px] text-white font-medium">
                <MapPin className="h-3 w-3 opacity-75" />
                {provider.address}
              </span>
            )}
            <span className="flex items-center gap-1.5 bg-white/12 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-[12px] text-white font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              Open now
            </span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Info cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            {
              label: "Total Meals",
              value: meals.length,
              sub: "on the menu",
              icon: <UtensilsCrossed className="h-3.5 w-3.5 opacity-40" />,
            },
            {
              label: "Available",
              value: availableCount,
              sub: "ready to order",
              icon: <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />,
            },
            {
              label: "Cuisine",
              value: provider.cuisineType ?? "—",
              sub: "specialty",
              icon: null,
            },
            {
              label: "Rating",
              value: provider.avgRating ? `${provider.avgRating.toFixed(1)}` : "New",
              sub: provider.totalReviews ? `${provider.totalReviews} reviews` : "no reviews yet",
              icon: <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />,
            },
          ].map(({ label, value, sub, icon }) => (
            <div key={label} className="bg-white border border-black/[0.07] rounded-2xl px-5 py-4">
              <p className="text-[10.5px] font-bold tracking-widest uppercase text-gray-400 mb-1">{label}</p>
              <div className="flex items-center gap-1.5">
                {icon}
                <span className="font-[family-name:var(--font-display,serif)] text-2xl font-bold text-gray-900 leading-none">
                  {value}
                </span>
              </div>
              <p className="text-[11.5px] text-gray-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Meals table ── */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="font-[family-name:var(--font-display,serif)] text-xl font-bold text-gray-900">
            Menu
          </h2>
          <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[12px] font-semibold px-3 py-1 rounded-full">
            {meals.length} meals
          </span>
        </div>

        <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#faf7f3]">
                  {["#", "Meal", "Price", "Availability", "Action"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-bold tracking-[0.06em] uppercase text-gray-400 border-b border-gray-100 whitespace-nowrap first:text-center first:w-12"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {meals.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-sm text-gray-400 italic">
                      No meals listed yet.
                    </td>
                  </tr>
                ) : (
                  meals.map((meal: any, i: number) => {
                    const isAvailable = meal.isAvailable !== false
                    return (
                      <tr
                        key={meal.id}
                        className={cn(
                          "border-b border-gray-50 last:border-0 transition-colors",
                          isAvailable ? "hover:bg-[#fdf9f5]" : "opacity-60"
                        )}
                      >
                        {/* # */}
                        <td className="px-4 py-4 text-center text-xs text-gray-400 font-semibold">
                          {i + 1}
                        </td>

                        {/* Meal name + image */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            {meal.imageUrl ? (
                              <div className="relative w-[52px] h-[44px] rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                  src={meal.imageUrl}
                                  alt={meal.name}
                                  fill
                                  className="object-cover"
                                  sizes="52px"
                                  unoptimized
                                />
                              </div>
                            ) : (
                              <div className="w-[52px] h-[44px] rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center flex-shrink-0">
                                <UtensilsCrossed className="h-5 w-5 text-white opacity-80" />
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-sm text-gray-900 leading-tight">{meal.name}</p>
                              {meal.category?.name && (
                                <p className="text-[11.5px] text-gray-400 mt-0.5">{meal.category.name}</p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-4 py-4">
                          <span className="font-[family-name:var(--font-display,serif)] text-base font-bold text-gray-900">
                            ৳{meal.price}
                          </span>
                        </td>

                        {/* Availability */}
                        <td className="px-4 py-4 hidden sm:table-cell">
                          <AvailBadge available={isAvailable} />
                        </td>

                        {/* Action */}
                        <td className="px-4 py-4">
                          {isAvailable ? (
                            <Link
                              href={`/meals/${meal.id}`}
                              className="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-[10px] text-[12.5px] font-semibold bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all whitespace-nowrap border-0"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </Link>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-[10px] text-[12.5px] font-semibold bg-gray-100 text-gray-400 cursor-not-allowed whitespace-nowrap">
                              <AlertCircle className="h-3.5 w-3.5" />
                              Unavailable
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}