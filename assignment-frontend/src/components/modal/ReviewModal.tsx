"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Star } from "lucide-react";
import ReviewForm from "../modules/review/ReviewForm";

export default function ReviewModal({ mealId }: { mealId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      {/* ── Trigger ── */}
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 h-9 px-4 rounded-xl border-none bg-linear-to-br from-orange-500 to-rose-600 text-white text-[13.5px] font-semibold shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all cursor-pointer mt-4">
          <Star className="h-4 w-4 fill-white/80 text-white" />
          Write a Review
        </button>
      </DialogTrigger>

      {/* ── Modal ── */}
      <DialogContent className="sm:max-w-105 rounded-[22px] p-0 overflow-hidden gap-0">

        {/* Header */}
        <DialogHeader className="flex flex-row items-center gap-3 bg-linear-to-r from-amber-50 to-white border-b border-amber-100 px-6 py-5">
          <div className="w-8.5 h-8.5 rounded-[10px] bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0 shadow-md shadow-rose-200">
            <Star className="h-3.75 w-3.75 text-white fill-white" />
          </div>
          <DialogTitle className="text-[1.1rem] font-bold text-gray-900 mt-0">
            Write a Review
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <div className="px-6 py-5">
          <ReviewForm mealId={mealId} onSuccess={() => setOpen(false)} />
        </div>

      </DialogContent>
    </Dialog>
  );
}