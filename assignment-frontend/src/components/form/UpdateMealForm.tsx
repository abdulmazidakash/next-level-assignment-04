"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { z } from "zod"

import { getCategories } from "@/services/category"
import { updateMeal } from "@/services/Meal"

const mealSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(5),
  price: z.number().min(1),
  imageUrl: z.string().url(),
  categoryId: z.string().min(1),
})

export default function UpdateMealForm({ meal }: any) {
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const res = await getCategories()
      setCategories(res?.data || [])
    }

    load()
  }, [])

  const form = useForm({
    defaultValues: {
      name: meal.name,
      description: meal.description,
      price: meal.price,
      imageUrl: meal.imageUrl,
      categoryId: meal.categoryId,
    },

    validators: {
      onSubmit: mealSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating meal...")

      try {
        const res = await updateMeal(meal.id, value)

        if (res?.error) {
          toast.error(res.error.message, { id: toastId })
          return
        }

        toast.success("Meal updated", { id: toastId })

        router.refresh()
        router.push("/dashboard/provider-own-meals")
      } catch {
        toast.error("Something went wrong", { id: toastId })
      }
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Meal</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="update-meal-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>

            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>

                  <Input
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>

                  <Textarea
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Price */}
            <form.Field name="price">
              {(field) => (
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
            </form.Field>

            {/* Image */}
            <form.Field name="imageUrl">
              {(field) => (
                <Field>
                  <FieldLabel>Image URL</FieldLabel>

                  <Input
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Category */}
            <form.Field name="categoryId">
              {(field) => (
                <Field>
                  <FieldLabel>Category</FieldLabel>

                  <Select
                    value={field.state.value}
                    onValueChange={(v) =>
                      field.handleChange(v)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
            </form.Field>

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          form="update-meal-form"
          type="submit"
          className="w-full"
        >
          Update Meal
        </Button>
      </CardFooter>
    </Card>
  )
}