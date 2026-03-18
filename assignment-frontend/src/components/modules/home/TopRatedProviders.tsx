import Link from "next/link";
import Image from "next/image";
import { getTopProviders } from "@/services/provider";
import { Star } from "lucide-react";

export default async function TopRatedProviders() {
  const providers = await getTopProviders();

  // Early return if no data
  if (!providers?.data?.length) {
    return null;
  }

  return (
    <section className="mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Top Rated Providers
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most loved and consistently excellent food providers on FoodHub
          </p>
        </div>

        {/* Providers grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">

          {providers.data.map((provider: any) => {
            const rating = Number(provider.avgRating || 0);
            const hasRating = rating > 0;

            return (
              <Link
                key={provider.id}
                href={`/providers/${provider.id}`}
                className="
                  group block
                  bg-white rounded-2xl overflow-hidden
                  border border-gray-100
                  shadow-sm hover:shadow-xl
                  transition-all duration-300 ease-out
                  hover:-translate-y-1
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                "
              >
                <div className="p-6 md:p-7 flex flex-col items-center text-center">

                  {/* Avatar with subtle ring on hover */}
                  <div className="
                    relative mb-5
                    group-hover:ring-4 group-hover:ring-orange-100
                    transition-all duration-300 rounded-full
                  ">
                    <Image
                      src={provider.user?.image || "/default-avatar.png"}
                      alt={provider.user?.name || "Provider"}
                      width={96}
                      height={96}
                      className="rounded-full object-cover border-2 border-white shadow-sm"
                      priority={false}
                      sizes="(max-width: 640px) 96px, 112px"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="
                    text-lg font-semibold text-gray-900 mb-1
                    group-hover:text-orange-700 transition-colors
                  ">
                    {provider.user?.name || "Unknown Provider"}
                  </h3>

                  {/* Rating line */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className={`
                      flex items-center gap-0.5 px-2.5 py-1 rounded-full text-sm font-medium
                      ${hasRating 
                        ? "bg-amber-100 text-amber-800" 
                        : "bg-gray-100 text-gray-600"}
                    `}>
                      <Star 
                        size={16} 
                        className={hasRating ? "fill-amber-500 text-amber-500" : "text-gray-400"} 
                        strokeWidth={hasRating ? 0 : 2}
                      />
                      <span>
                        {hasRating ? rating.toFixed(1) : "—"}
                      </span>
                    </div>

                    {hasRating && (
                      <span className="text-sm text-gray-500">
                        • {provider.totalReviews || 0} reviews
                      </span>
                    )}
                  </div>

                  {/* Optional: short tagline / cuisine type / location */}
                  {/* Uncomment and adjust according to your data structure */}
                  {/* <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {provider.cuisine || provider.category || "• Popular • Fast delivery"}
                  </p> */}

                </div>
              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}