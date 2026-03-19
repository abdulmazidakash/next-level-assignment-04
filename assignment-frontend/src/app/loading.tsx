// app/loading.tsx
// Next.js automatically uses this as the Suspense fallback for every page
// in the app directory. Place additional loading.tsx files in sub-folders
// (e.g. app/dashboard/loading.tsx) to scope them to specific routes.

import { UtensilsCrossed } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f2ec]">

      {/* Animated logo tile */}
      <div className="relative mb-6">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-[18px] bg-linear-to-br from-orange-500 to-rose-600 animate-ping opacity-25" />

        {/* Icon tile */}
        <div className="relative w-16 h-16 rounded-[18px] bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-300">
          <UtensilsCrossed className="h-8 w-8 text-white" strokeWidth={1.8} />
        </div>
      </div>

      {/* Wordmark */}
      <p className=" text-xl font-bold text-gray-900 mb-1">
        Food
        <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
          Hub
        </span>
      </p>

      {/* Animated dots */}
      <div className="flex items-center gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

    </div>
  );
}