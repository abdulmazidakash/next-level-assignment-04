/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye, X, Tag, UtensilsCrossed } from "lucide-react";
import Image from "next/image";

export default function ViewMealDialog({ meal }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[9px] border-[1.5px] border-red-200 bg-red-50 text-red-500 text-[12px] font-semibold hover:bg-red-100 hover:border-red-300 hover:-translate-y-0.5 transition-all">
          <Eye className="h-3.5 w-3.5" />
        </button>
      </DialogTrigger>

      <DialogContent className="p-0 overflow-hidden max-w-md rounded-2xl border-0 shadow-2xl bg-white">
        {/* Hero Image Section */}
        <div className="relative w-full h-56 bg-linear-to-br from-orange-50 to-red-50">
          <Image
            fill
            alt={meal?.name}
            src={meal?.imageUrl}
            className="object-cover"
          />
          {/* linear overlay at bottom for text legibility */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

          {/* Price badge overlaid on image */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm text-red-600 font-bold text-sm px-3 py-1.5 rounded-full shadow-md">
            <Tag className="h-3.5 w-3.5" />
            ৳ {meal?.price}
          </div>
        </div>

        {/* Content Section */}
        <div className="px-5 pt-4 pb-5 space-y-3">
          {/* Title Row */}
          <div className="flex items-start gap-2">
            <div className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
              <UtensilsCrossed className="h-3.5 w-3.5 text-red-500" />
            </div>
            <h2 className="text-[18px] font-bold text-gray-900 leading-snug">
              {meal?.name}
            </h2>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Description */}
          <p className="text-[13.5px] text-gray-500 leading-relaxed">
            {meal?.description || "No description available."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}