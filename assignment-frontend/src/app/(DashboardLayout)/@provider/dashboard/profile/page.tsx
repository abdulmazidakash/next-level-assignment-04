import { getOwnProvider } from "@/services/provider"
import Link from "next/link"
import {
  Home, MapPin, User, Mail, UtensilsCrossed,
  Star, MessageSquare, Pencil, Plus,
} from "lucide-react"

function initials(name: string) {
  return name
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() ?? "?"
}

export default async function ProviderProfilePage() {
  const res      = await getOwnProvider()
  const provider = res?.data

  // ── Empty / no profile ──────────────────────────────────
  if (!provider) {
    return (
      <div className="min-h-screen bg-[#f7f2ec] flex items-center justify-center p-6">
        <div className="bg-white border border-black/[0.07] rounded-[24px] p-14 flex flex-col items-center gap-5 max-w-sm w-full text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Home className="h-7 w-7 text-amber-700" />
          </div>
          <h2 className=" text-xl font-bold text-gray-900">
            No Provider Profile
          </h2>
          <p className="text-[13.5px] text-gray-400 leading-relaxed">
            You haven't set up a restaurant profile yet. Create one to start listing meals.
          </p>
          <Link
            href="/dashboard/create-provider-profile"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-[14px] bg-linear-to-br from-orange-500 to-rose-600 text-white text-[14px] font-semibold shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="h-4 w-4" />
            Create Provider Profile
          </Link>
        </div>
      </div>
    )
  }

  // ── Profile exists ───────────────────────────────────────
  const mealCount   = provider.meals?.length ?? 0
  const avgRating   = provider.avgRating
  const reviewCount = provider.totalReviews

  const infoTiles = [
    { label: "Cuisine Type", value: provider.cuisineType, icon: <Home className="h-3 w-3" /> },
    { label: "Address",      value: provider.address,     icon: <MapPin className="h-3 w-3" /> },
    { label: "Owner",        value: provider.user?.name,  icon: <User className="h-3 w-3" /> },
    { label: "Email",        value: provider.user?.email, icon: <Mail className="h-3 w-3" /> },
  ]

  return (
    <div className="min-h-screen bg-[#f7f2ec]">
      <div className="max-w-180 mx-auto px-4 sm:px-6 py-10">

        {/* ── Card ── */}
        <div className="rounded-[24px] overflow-hidden shadow-xl border border-black/[0.07]">

          {/* Banner */}
          <div className="relative h-50 bg-linear-to-br from-orange-500 via-rose-500 to-rose-700 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-8 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 right-28 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute top-5 left-10 w-16 h-16 rounded-full bg-white/10" />

            {/* Edit button */}
            <div className="absolute top-4 right-4 z-10">
              <Link
                href="/dashboard/update-provider-profile"
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full border-[1.5px] border-white/50 bg-white/15 backdrop-blur-sm text-white text-[13px] font-semibold hover:bg-white/25 hover:border-white/70 transition-all whitespace-nowrap"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Avatar + status row */}
          <div className="flex items-end justify-between px-8 -mt-10 relative z-10 bg-white">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-4xl bg-linear-to-br from-orange-500 to-rose-600 border-4 border-white shadow-[0_8px_24px_rgba(232,56,79,0.3)] flex items-center justify-center shrink-0 translate-y-0">
              <span className=" text-2xl font-bold text-white">
                {initials(provider.restaurantName)}
              </span>
            </div>

            {/* Status pill */}
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[12px] font-semibold px-3 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              Active
            </div>
          </div>

          {/* Body */}
          <div className="bg-white px-8 pb-8 pt-4 flex flex-col gap-5">
            {/* Name + bio */}
            <div>
              <h1 className=" text-[1.6rem] font-bold text-gray-900 leading-tight">
                {provider.restaurantName}
              </h1>
              {provider.bio && (
                <p className="text-[14px] text-gray-400 leading-relaxed mt-2">
                  {provider.bio}
                </p>
              )}
            </div>

            {/* Info tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {infoTiles.map(({ label, value, icon }) => (
                <div key={label} className="bg-[#faf7f3] rounded-[14px] px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-widest uppercase text-gray-400 mb-1.5">
                    <span className="opacity-70">{icon}</span>
                    {label}
                  </div>
                  <p className="font-semibold text-[14px] text-gray-900 leading-snug">
                    {value ?? "—"}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex gap-2.5 flex-wrap">
              {[
                { val: mealCount,   label: "Meals",   icon: <UtensilsCrossed className="h-3.5 w-3.5 text-amber-700" /> },
                { val: avgRating    ? avgRating.toFixed(1)          : "—", label: "Rating",  icon: <Star className="h-3.5 w-3.5 text-amber-700" /> },
                { val: reviewCount  ? reviewCount.toLocaleString()  : "—", label: "Reviews", icon: <MessageSquare className="h-3.5 w-3.5 text-amber-700" /> },
              ].map(({ val, label, icon }) => (
                <div
                  key={label}
                  className="flex-1 min-w-22.5 bg-amber-50 border border-amber-200 rounded-[14px] px-4 py-3"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {icon}
                    <span className="text-[10.5px] font-bold tracking-widest uppercase text-amber-700">
                      {label}
                    </span>
                  </div>
                  <p className=" text-[1.4rem] font-bold text-gray-900 leading-none">
                    {val}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}