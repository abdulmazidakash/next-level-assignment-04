"use client";

import { createReview } from "@/services/review";
import { toast } from "sonner";

export default function ReviewForm({
  mealId,
  onSuccess,
}: {
  mealId: string;
  onSuccess?: () => void;
}) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const rating = Number(formData.get("rating"));
      const comment = formData.get("comment");

      await createReview({
        mealId,
        rating,
        comment,
      });

      toast.success("Review added!");

      e.currentTarget.reset();

      onSuccess?.();

    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <select name="rating" className="border p-2 rounded w-full">
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
      </select>

      <textarea
        name="comment"
        placeholder="Write review"
        className="border p-3 w-full rounded"
        required
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Submit Review
      </button>

    </form>
  );
}