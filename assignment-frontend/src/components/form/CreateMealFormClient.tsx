"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { getCategories } from "@/services/category";
import { createMeal } from "@/services/Meal";

const mealSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(5),
  price: z.number().min(1),
  imageUrl: z.string().url(),
  categoryId: z.string().min(1, "Category required"),
});

export function CreateMealFormClient() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const res = await getCategories();
      setCategories(res?.data || []);
    };

    loadCategories();
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      categoryId: "",
    },

    validators: {
      onSubmit: mealSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating meal...");

      try {
        const res = await createMeal(value);

        if (res?.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success("Meal created", { id: toastId });

        form.reset();
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Meal</CardTitle>
        <CardDescription>Add a new meal</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="meal-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>

            {/* Meal Name */}
            <form.Field
              name="name"
              children={(field) => (
                <Field>
                  <FieldLabel>Meal Name</FieldLabel>

                  <Input
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Chicken Burger"
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Description */}
            <form.Field
              name="description"
              children={(field) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>

                  <Textarea
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Delicious meal"
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Price */}
            <form.Field
              name="price"
              children={(field) => (
                <Field>
                  <FieldLabel>Price</FieldLabel>

                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(Number(e.target.value))
                    }
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Image URL */}
            <form.Field
              name="imageUrl"
              children={(field) => (
                <Field>
                  <FieldLabel>Image URL</FieldLabel>

                  <Input
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="https://..."
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Dynamic Category Dropdown */}
            <form.Field
              name="categoryId"
              children={(field) => (
                <Field>
                  <FieldLabel>Category</FieldLabel>

                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="meal-form"
          className="w-full"
        >
          Create Meal
        </Button>
      </CardFooter>
    </Card>
  );
}