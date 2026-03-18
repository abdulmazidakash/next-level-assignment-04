"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import ReviewForm from "../modules/review/ReviewForm";

export default function ReviewModal({ mealId }: { mealId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      {/* BUTTON */}
      <DialogTrigger asChild>
        <button className="bg-black text-white px-4 py-2 rounded my-4">
          ✍️ Write Review
        </button>
      </DialogTrigger>

      {/* MODAL */}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Write Your Review</DialogTitle>
        </DialogHeader>

        {/* FORM */}
        <ReviewForm mealId={mealId} onSuccess={() => setOpen(false)} />

      </DialogContent>
    </Dialog>
  );
}