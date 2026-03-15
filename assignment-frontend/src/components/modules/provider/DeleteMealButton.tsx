/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { Button } from "@/components/ui/button";
import { deleteMeal } from "@/services/Meal";
import { useRouter } from "next/navigation";

export default function DeleteMealButton({ id }: any) {

  const router = useRouter();

  const handleDelete = async () => {
    await deleteMeal(id);
    router.refresh();
  };

  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}