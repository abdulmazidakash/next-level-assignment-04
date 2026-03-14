/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ViewMealDialog({ meal }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View
        </Button>
      </DialogTrigger>

      <DialogContent>

        <Image width={48} height={48} alt={meal?.name} src={meal.imageUrl} className="rounded-lg" />

        <h2 className="text-xl font-bold">{meal.name}</h2>

        <p>{meal.description}</p>

        <p className="font-bold">৳ {meal.price}</p>

      </DialogContent>
    </Dialog>
  );
}