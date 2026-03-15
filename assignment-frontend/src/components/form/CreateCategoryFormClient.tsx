"use client";


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
import { createCategory } from "@/services/category";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters"),
});

export function CreateCategoryFormClient() {
  const form = useForm({
    defaultValues: {
      name: "",
    },

    validators: {
      onSubmit: categorySchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating category...");

      try {
        const res = await createCategory(value);

        if (res?.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success("Category created", { id: toastId });

        form.reset();
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
        <CardDescription>
          Add new meal category
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="category-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>

            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Category Name</FieldLabel>

                    <Input
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      placeholder="Burger"
                    />

                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            />

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          form="category-form"
          type="submit"
          className="w-full"
        >
          Create Category
        </Button>
      </CardFooter>
    </Card>
  );
}