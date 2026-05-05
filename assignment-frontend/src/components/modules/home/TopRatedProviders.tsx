import Link from "next/link";
import Image from "next/image";
import { getTopProviders } from "@/services/provider";
import { Star, ArrowRight } from "lucide-react";

const ACCENT_COLORS = [
  { bar: "bg-orange-500", avatar: "bg-orange-50 text-orange-700" },
  { bar: "bg-emerald-500", avatar: "bg-emerald-50 text-emerald-700" },
  { bar: "bg-blue-500", avatar: "bg-blue-50 text-blue-700" },
  { bar: "bg-violet-500", avatar: "bg-violet-50 text-violet-700" },
  { bar: "bg-amber-500", avatar: "bg-amber-50 text-amber-700" },
  { bar: "bg-green-600", avatar: "bg-green-50 text-green-700" },
];

function initials(name?: string) {
  return (
    name
      ?.split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() ?? "?"
  );
}

export default async function TopRatedProviders() {
  const providers = await getTopProviders();

  if (!providers?.data?.length) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-background border border-border text-amber-800 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            Top Rated
          </div>

          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-900 dark:text-gray-300 leading-tight mb-3">
            Meet Our{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Best Providers
            </span>
          </h2>

          <p className="text-[15px] text-gray-400 max-w-120 mx-auto leading-relaxed">
            Discover the most loved and consistently excellent food providers on FoodHub
          </p>
        </div>

        {/* ── Provider grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {providers.data.map((provider: any, i: number) => {
            const rating    = Number(provider.avgRating || 0);
            const hasRating = rating > 0;
            const mealCount = provider._count?.meals ?? provider.meals?.length ?? 0;
            const accent    = ACCENT_COLORS[i % ACCENT_COLORS.length];

            return (
              <Link
                key={provider.id}
                href={`/providers/${provider.id}`}
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              >
                {/* ── Top row: accent bar + avatar + name + rank ── */}
                <div className="flex items-center gap-3.5 px-4 pt-4 pb-3">
                  {/* Left accent bar */}
                  <div className={`w-1 h-12 rounded-full shrink-0 ${accent.bar}`} />

                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-[15px] font-semibold overflow-hidden ${accent.avatar}`}>
                    {provider.user?.image ? (
                      <Image
                        src={provider.user.image}
                        alt={provider.user?.name ?? "Provider"}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    ) : (
                      <span>{initials(provider.user?.name ?? provider.restaurantName)}</span>
                    )}
                  </div>

                  {/* Name + cuisine */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14.5px] font-semibold text-gray-900 dark:text-gray-300 group-hover:text-orange-600 transition-colors leading-snug truncate">
                      {provider.restaurantName ?? provider.user?.name ?? "Unknown Provider"}
                    </h3>
                    {provider.cuisineType && (
                      <p className="text-[12px] text-gray-400 mt-0.5 truncate">{provider.cuisineType}</p>
                    )}
                  </div>

                  {/* Rank */}
                  <span className="text-[11px] font-semibold text-gray-400 shrink-0">
                    #{i + 1}
                  </span>
                </div>

                {/* ── Rating ── */}
                <div className="flex items-center gap-1.5 px-4 pb-3 pl-[calc(1rem+4px+14px+48px)]">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" strokeWidth={0} />
                  <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">
                    {hasRating ? rating.toFixed(1) : "—"}
                  </span>
                  {hasRating && (
                    <span className="text-[12px] text-gray-400">
                      · {(provider.totalReviews || 0).toLocaleString()} reviews
                    </span>
                  )}
                </div>

                {/* ── Stats row ── */}
                <div className="flex border-t border-gray-100">
                  {[
                    { value: mealCount,                                            label: "Meals"    },
                    { value: `${provider.avgDelivery ?? 30}m`,                     label: "Delivery" },
                    { value: provider.positiveRate ? `${provider.positiveRate}%` : "—", label: "Positive" },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex-1 py-3 text-center border-r border-border last:border-r-0">
                      <span className="text-[13.5px] font-semibold text-gray-900 dark:text-gray-300 block">{value}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mt-0.5 block">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ── CTA ── */}
                <div className="px-4 pb-4 pt-3">
                  <div className="flex items-center justify-center gap-1.5 h-9 rounded-xl border border-gray-200 text-gray-500 text-[13px] font-medium group-hover:border-orange-300 group-hover:text-orange-600 group-hover:bg-orange-50 transition-all">
                    View Menu
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── View all ── */}
        <div className="text-center mt-10">
          <Link
            href="/providers"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-[14px] border border-gray-200 bg-white text-[14px] font-semibold text-gray-700 hover:border-orange-300 hover:bg-amber-50 hover:text-orange-600 transition-all"
          >
            Browse All Providers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}