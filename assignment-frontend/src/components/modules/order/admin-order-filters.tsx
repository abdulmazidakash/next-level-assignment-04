"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const FILTERS = ["All", "Pending", "Confirmed", "Preparing", "Delivered", "Cancelled"]

export default function AdminOrdersFilters() {
  const [active, setActive] = useState("All")

  return (
    <div className="flex gap-2 flex-wrap">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => setActive(f)}
          className={cn(
            "h-8 px-3.5 rounded-full border-[1.5px] text-[12px] font-semibold transition-all",
            active === f
              ? "border-orange-400 text-orange-600 bg-amber-50"
              : "border-gray-200 text-gray-400 bg-white hover:border-orange-300 hover:text-orange-500 hover:bg-amber-50/50"
          )}
        >
          {f}
        </button>
      ))}
    </div>
  )
}