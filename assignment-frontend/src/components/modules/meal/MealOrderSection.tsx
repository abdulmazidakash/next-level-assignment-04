/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import MealOrderModal, { OrderFormValues } from "./MealOrderModal";
import { createOrder } from "@/services/order";
import { toast } from "sonner";

export default function MealOrderSection({ meal }: { meal: any }) {
  const [open, setOpen] = useState(false);

  const handleOrderSubmit = async (data: OrderFormValues) => {
    try {
      const result = await createOrder(data); // call server function
      if (result?.success) {
        toast.success(result.message);
        setOpen(false); // close modal on success
      } else {
        toast.error(result?.message || "Failed to create order");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <MealOrderModal
      meals={[{ id: meal.id, title: meal.name }]}
      open={open}
      setOpen={setOpen}
      onSubmit={handleOrderSubmit}
    />
  );
}