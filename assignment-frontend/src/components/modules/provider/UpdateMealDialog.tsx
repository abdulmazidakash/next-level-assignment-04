/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateMeal } from "@/services/Meal";

export default function UpdateMealDialog({ meal }: any) {

  const router = useRouter();

  const [name, setName] = useState(meal.name);
  const [price, setPrice] = useState(meal.price);

  const handleUpdate = async () => {
    await updateMeal(meal.id, {
      name,
      price,
    });

    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Update</Button>
      </DialogTrigger>

      <DialogContent className="space-y-4">

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Button onClick={handleUpdate}>
          Save
        </Button>

      </DialogContent>
    </Dialog>
  );
}