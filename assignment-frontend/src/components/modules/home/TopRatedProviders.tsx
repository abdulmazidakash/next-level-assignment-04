import Link from "next/link";
import Image from "next/image";
import { getTopProviders } from "@/services/provider";

export default async function TopRatedProviders() {
  const providers = await getTopProviders();

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">
        ⭐ Top Rated Providers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {providers?.data?.map((provider: any) => (
          <Link
            href={`/providers/${provider.id}`}
            key={provider.id}
          >
            <div className="p-4 border rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              
              <Image
                src={provider.user?.image || "/default.png"}
                alt="provider"
                width={80}
                height={80}
                className="rounded-full mx-auto"
              />

              <h3 className="text-center mt-2 font-semibold">
                {provider.user?.name}
              </h3>

              <p className="text-center text-yellow-500">
                ⭐ {provider.avgRating?.toFixed(1)}
              </p>

              <p className="text-center text-sm text-gray-500">
                {provider.totalReviews || 0} reviews
              </p>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}