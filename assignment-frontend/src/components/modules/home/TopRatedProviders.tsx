import Link from "next/link";
import Image from "next/image";
import { getTopProviders } from "@/services/provider";
import { Star, ArrowRight } from "lucide-react";

// ── Gradient palette for cover banners ───────────────────────
const COVER_GRADIENTS = [
  "from-orange-500 to-rose-600",
  "from-teal-600 to-emerald-500",
  "from-blue-600 to-sky-400",
  "from-violet-600 to-purple-500",
  "from-amber-600 to-amber-400",
  "from-green-700 to-green-500",
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
    <section className="py-16 md:py-20 bg-[#f7f2ec]">
      <div className="max-w-275 mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            Top Rated
          </div>

          <h2 className=" text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-900 leading-tight mb-3">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.data.map((provider: any, i: number) => {
            const rating     = Number(provider.avgRating || 0);
            const hasRating  = rating > 0;
            const mealCount  = provider._count?.meals ?? provider.meals?.length ?? 0;
            const gradient   = COVER_GRADIENTS[i % COVER_GRADIENTS.length];

            return (
              <Link
                key={provider.id}
                href={`/providers/${provider.id}`}
                className="group flex flex-col bg-white border border-black/[0.07] rounded-[22px] overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)] hover:border-orange-200/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              >
                {/* Cover banner */}
                <div className={`relative h-27.5 bg-linear-to-br ${gradient} overflow-hidden shrink-0`}>
                  {/* Decorative circles */}
                  <div className="absolute -top-7 -right-5 w-28 h-28 rounded-full bg-white/10" />
                  <div className="absolute -bottom-3 left-5 w-16 h-16 rounded-full bg-white/10" />

                  {/* Rank badge */}
                  <span className="absolute top-2.5 left-3 bg-white/18 backdrop-blur-sm border border-white/30 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    #{i + 1}
                  </span>

                  {/* Floating avatar */}
                  <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-18 h-18 rounded-full border-4 border-white shadow-lg overflow-hidden">
                      {provider.user?.image ? (
                        <Image
                          src={provider.user.image}
                          alt={provider.user?.name ?? "Provider"}
                          width={72}
                          height={72}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      ) : (
                        <div className={`w-full h-full bg-linear-to-br ${gradient} flex items-center justify-center`}>
                          <span className="text-xl font-bold text-white">
                            {initials(provider.user?.name ?? provider.restaurantName)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="pt-12 px-6 pb-4 text-center flex flex-col gap-2 flex-1">
                  <h3 className=" text-[1.05rem] font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
                    {provider.restaurantName ?? provider.user?.name ?? "Unknown Provider"}
                  </h3>

                  {provider.cuisineType && (
                    <p className="text-[12.5px] text-gray-400 -mt-1">{provider.cuisineType}</p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12.5px] font-bold ${hasRating ? "bg-amber-50 border border-amber-200 text-amber-800" : "bg-gray-100 text-gray-500"}`}>
                      <Star
                        className={`h-3.5 w-3.5 ${hasRating ? "fill-amber-500 text-amber-500" : "text-gray-400"}`}
                        strokeWidth={0}
                      />
                      {hasRating ? rating.toFixed(1) : "—"}
                    </div>
                    {hasRating && (
                      <span className="text-[12px] text-gray-400">
                        {(provider.totalReviews || 0).toLocaleString()} reviews
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex border-t border-gray-100">
                  {[
                    { value: mealCount,            label: "Meals" },
                    { value: `${provider.avgDelivery ?? 30}m`, label: "Delivery" },
                    { value: provider.positiveRate ? `${provider.positiveRate}%` : "—", label: "Positive" },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex-1 py-3 text-center border-r border-gray-100 last:border-r-0">
                      <span className=" text-[1rem] font-bold text-gray-900 block">
                        {value}
                      </span>
                      <span className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-400 mt-0.5 block">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-5 pb-5 pt-3">
                  <div className="flex items-center justify-center gap-1.5 h-10 rounded-2xl border-[1.5px] border-orange-400/40 text-orange-600 text-[13px] font-semibold group-hover:bg-linear-to-br group-hover:from-orange-500 group-hover:to-rose-600 group-hover:text-white group-hover:border-transparent transition-all">
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