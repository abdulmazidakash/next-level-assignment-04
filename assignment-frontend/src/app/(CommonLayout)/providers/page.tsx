import Link from "next/link"
import Image from "next/image"
import { MapPin, UtensilsCrossed, ArrowRight, Search } from "lucide-react"
import { getAllPublicProviders } from "@/services/provider"
import { Provider } from "@/types/provider"

// ── linear palette for avatar fallbacks ─────────────────────
const linearS = [
  "from-orange-500 to-rose-600",
  "from-teal-600 to-emerald-500",
  "from-blue-600 to-sky-400",
  "from-amber-700 to-amber-500",
  "from-violet-600 to-purple-500",
  "from-green-700 to-green-500",
]

function initials(name: string) {
  return name
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() ?? "?"
}

export default async function ProvidersPage() {
  const { data } = await getAllPublicProviders()
  const providers: Provider[] = data ?? [];
  console.log('providers data: ===>',providers)

  const totalMeals = providers.reduce((sum, p) => sum + (p._count?.meals ?? 0), 0)
  const avgMeals = providers.length ? (totalMeals / providers.length).toFixed(1) : "0"
  const cities = new Set(providers.map((p) => p.address?.split(",").pop()?.trim())).size

  return (
    <div className="min-h-screen bg-[#f7f2ec]">
      <div className="max-w-275 mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page header ── */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Food{" "}
              <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                Providers
              </span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">Browse all registered restaurant partners</p>
          </div>

          {/* Search — client component needed for interactivity; kept as static input here */}
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search providers…"
              className="w-full h-9 pl-9 pr-4 rounded-full border border-gray-200 bg-white text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-orange-400 transition-colors"
            />
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {[
            { label: "Total Providers", value: providers.length, sub: "Registered partners" },
            { label: "Total Meals",     value: totalMeals,       sub: "Across all providers" },
            { label: "Cities",          value: cities,           sub: "Coverage areas" },
            { label: "Avg Meals",       value: avgMeals,         sub: "Per provider" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white border border-black/[0.07] rounded-2xl px-5 py-4">
              <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1">{label}</p>
              <p className="text-3xl font-bold text-gray-900 leading-none">
                {value}
              </p>
              <p className="text-[11.5px] text-gray-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#faf7f3]">
                  {["#", "Restaurant", "Owner", "Location", "Meals", "Status", "Action"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11.5px] font-semibold tracking-[0.05em] uppercase text-gray-400 border-b border-gray-100 whitespace-nowrap first:text-center first:w-12"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {providers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-sm text-gray-400 italic">
                      No providers found.
                    </td>
                  </tr>
                ) : (
                  providers.map((provider, i) => (
                    <tr
                      key={provider.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-[#fdf9f5] transition-colors"
                    >
                      {/* # */}
                      <td className="px-4 py-4 text-center text-xs text-gray-400 font-medium">{i + 1}</td>

                      {/* Restaurant */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {provider.user?.image ? (
                            <Image
                              src={provider.user.image}
                              alt={provider.restaurantName}
                              width={40}
                              height={40}
                              className="rounded-xl object-cover shrink-0"
                            />
                          ) : (
                            <div
                              className={`w-10 h-10 rounded-xl bg-linear-to-br ${linearS[i % linearS.length]} flex items-center justify-center text-white text-[13px] font-bold shrink-0`}
                            >
                              {initials(provider.restaurantName)}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-sm text-gray-900 leading-tight">
                              {provider.restaurantName}
                            </p>
                            <p className="text-[11.5px] text-gray-400 mt-0.5">{provider.cuisineType}</p>
                          </div>
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="px-4 py-4">
                        <span className="text-sm font-medium text-gray-800">{provider.user?.name}</span>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                          <MapPin className="h-3 w-3 opacity-50 shrink-0" />
                          {provider.address}
                        </div>
                      </td>

                      {/* Meals */}
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[12px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                          <UtensilsCrossed className="h-3 w-3" />
                          {provider._count?.meals ?? 0} meals
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-[12px] font-medium text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                          Active
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4">
                        <Link
                          href={`/providers/${provider.id}`}
                          className="inline-flex items-center gap-1.5 h-8.5 px-3.5 rounded-[10px] text-[12.5px] font-semibold bg-linear-to-br from-orange-500 to-rose-600 text-white shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all whitespace-nowrap"
                        >
                          View
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}