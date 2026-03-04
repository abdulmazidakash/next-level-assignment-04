"use client";

import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ---------------- ZOD SCHEMA ---------------- */

const orderSchema = z.object({
  address: z.string().min(5, "Address is required"),
  items: z
    .array(
      z.object({
        mealId: z.string().min(1, "Please select a meal"),
        quantity: z.number().min(1, "Minimum 1 quantity"),
      })
    )
    .min(1, "Add at least one meal"),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderModalProps {
  meals: { id: string; title: string }[];
  open: boolean;
  setOpen: (val: boolean) => void;
  onSubmit: (data: OrderFormValues) => void;
}

/* ---------------- COMPONENT ---------------- */

export default function MealOrderModal({
meals,
  open,
  setOpen,
  onSubmit,
}: OrderModalProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      address: "",
      items: [{ mealId: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
   <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Order Now</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Your Order</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-5"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          {/* Address */}
          <div className="space-y-1">
            <Label>Delivery Address</Label>
            <Input
              placeholder="Enter full address"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Items */}
          <div className="space-y-3">
            <Label>Meals</Label>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-2"
              >
                {/* Meal Select */}
                <Select
                  onValueChange={(val) =>
                    setValue(`items.${index}.mealId`, val)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal" />
                  </SelectTrigger>
                  <SelectContent>
                    {meals.map((meal) => (
                      <SelectItem key={meal.id} value={meal.id}>
                        {meal.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Quantity */}
                <Input
                  type="number"
                  min={1}
                  className="w-20"
                  {...register(`items.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                />

                {/* Remove Button */}
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}

            {errors.items && (
              <p className="text-red-500 text-sm">
                {errors.items.message as string}
              </p>
            )}

            {/* Add Meal */}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({ mealId: "", quantity: 1 })
              }
            >
              + Add Another Meal
            </Button>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Confirm Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}