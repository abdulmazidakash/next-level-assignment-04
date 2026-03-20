"use client";

import { useState } from "react";
import { createReview } from "@/services/review";
import { toast } from "sonner";
import { Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export default function ReviewForm({
  mealId,
  onSuccess,
}: {
  mealId: string;
  onSuccess?: () => void;
}) {
  const [rating, setRating]   = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    setLoading(true);
    try {
      await createReview({ mealId, rating, comment });
      console.log('review comment: ===>', mealId, rating, comment)
      toast.success("Review submitted!");
      setRating(0);
      setComment("");
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const active = hovered || rating;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* ── Star rating ── */}
      <div className="flex flex-col gap-2">
        <label className="text-[12.5px] font-semibold text-gray-600">
          Your Rating <span className="text-rose-500">*</span>
        </label>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110 focus:outline-none"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors",
                  active >= star
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-100 text-gray-300"
                )}
              />
            </button>
          ))}
          {active > 0 && (
            <span className="ml-2 text-[13px] font-semibold text-amber-700">
              {LABELS[active]}
            </span>
          )}
        </div>
      </div>

      {/* ── Comment ── */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[12.5px] font-semibold text-gray-600">
          Your Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you love (or not love) about this meal?"
          rows={4}
          className="w-full rounded-[12px] border-[1.5px] border-gray-200 px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none resize-none leading-relaxed focus:border-orange-400 focus:bg-orange-50/20 transition-all bg-white"
        />
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={loading}
        className={cn(
          "h-11 w-full rounded-[12px] flex items-center justify-center gap-2",
          "text-[14px] font-semibold text-white border-none cursor-pointer",
          "bg-gradient-to-br from-orange-500 to-rose-600",
          "hover:from-orange-600 hover:to-rose-700",
          "shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5",
          "transition-all font-[family-name:var(--font-sans)]",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        )}
      >
        {loading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
        ) : (
          "Submit Review"
        )}
      </button>

    </form>
  );
}