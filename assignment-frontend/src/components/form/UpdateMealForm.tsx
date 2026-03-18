"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { z } from "zod"
import { UtensilsCrossed, ImageIcon, ArrowLeft, Loader2, Save } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCategories } from "@/services/category"
import { updateMeal } from "@/services/Meal"
import { cn } from "@/lib/utils"

const mealSchema = z.object({
  name:        z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price:       z.number().min(1, "Price must be at least 1"),
  imageUrl:    z.string().url("Please enter a valid image URL"),
  categoryId:  z.string().min(1, "Category is required"),
})

// ── Helpers ──────────────────────────────────────────────────
function inputCn(hasError?: boolean) {
  return cn(
    "h-11 w-full rounded-[12px] border-[1.5px] px-4 text-[14px] text-gray-900",
    "placeholder:text-gray-400 outline-none transition-all bg-white ",
    hasError
      ? "border-red-300 bg-red-50/30 focus:border-red-400"
      : "border-gray-200 focus:border-orange-400 focus:bg-orange-50/20"
  )
}

function FormField({
  label,
  required,
  error,
  children,
  className,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-[12.5px] font-semibold text-gray-600">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-[11.5px] text-red-500">{error}</p>}
    </div>
  )
}

export default function UpdateMealForm({ meal }: any) {
  const router = useRouter()
  const [categories, setCategories]     = useState<any[]>([])
  const [imagePreview, setImagePreview] = useState<string>(meal.imageUrl || "")

  useEffect(() => {
    getCategories().then((res) => setCategories(res?.data || []))
  }, [])

  const form = useForm({
    defaultValues: {
      name:        meal.name        || "",
      description: meal.description || "",
      price:       meal.price       || 0,
      imageUrl:    meal.imageUrl    || "",
      categoryId:  meal.categoryId  || "",
    },
    validators: { onSubmit: mealSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating meal…")
      try {
        const res = await updateMeal(meal.id, value)
        if (res?.error) {
          toast.error(res.error.message, { id: toastId })
          return
        }
        toast.success("Meal updated!", { id: toastId })
        router.refresh()
        router.push("/dashboard/provider-own-meals")
      } catch {
        toast.error("Something went wrong", { id: toastId })
      }
    },
  })

  return (
    <div className="w-full max-w-160 bg-white border border-black/8 rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.04)]">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 bg-linear-to-r from-amber-50 to-white border-b border-amber-100 px-7 py-5">
        <div className="w-10.5 h-10.5 rounded-2xl bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0 shadow-md shadow-rose-200">
          <UtensilsCrossed className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-[1.2rem] font-bold text-gray-900 leading-tight">
            Update Meal
          </h2>
          <p className="text-[13px] text-gray-400 mt-0.5">Edit your meal details</p>
        </div>
      </div>

      {/* ── Current meal preview tile ── */}
      <div className="mx-7 mt-5 flex items-center gap-3.5 bg-[#faf7f3] rounded-[14px] px-4 py-3.5">
        {/* Thumbnail */}
        <div className="relative w-13 h-11 rounded-[10px] overflow-hidden shrink-0">
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagePreview}
              alt={meal.name}
              className="w-full h-full object-cover"
              onError={() => setImagePreview("")}
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center">
              <UtensilsCrossed className="h-5 w-5 text-white opacity-80" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-[14.5px] text-gray-900 truncate">{meal.name}</p>
          <p className="text-[12px] text-gray-400 mt-0.5">
            ৳{meal.price} · {meal.category?.name ?? "Uncategorised"}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0">
          <Save className="h-2.5 w-2.5" />
          Editing
        </div>
      </div>

      {/* ── Form ── */}
      <form
        id="update-meal-form"
        onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}
        className="px-7 py-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Name — full */}
          <form.Field name="name">
            {(field) => (
              <FormField
                label="Meal Name"
                required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
                className="sm:col-span-2"
              >
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="e.g. Kacchi Biryani"
                  className={inputCn(field.state.meta.isTouched && !!field.state.meta.errors[0])}
                />
              </FormField>
            )}
          </form.Field>

          {/* Description — full */}
          <form.Field name="description">
            {(field) => (
              <FormField
                label="Description"
                required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
                className="sm:col-span-2"
              >
                <textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Describe the meal — ingredients, taste, serving size…"
                  rows={3}
                  className={cn(
                    "w-full rounded-2xl border-[1.5px] px-4 py-3 text-[14px] text-gray-900",
                    "placeholder:text-gray-400 outline-none resize-none leading-relaxed",
                    "transition-all bg-white ",
                    field.state.meta.isTouched && !!field.state.meta.errors[0]
                      ? "border-red-300 bg-red-50/30 focus:border-red-400"
                      : "border-gray-200 focus:border-orange-400 focus:bg-orange-50/20"
                  )}
                />
              </FormField>
            )}
          </form.Field>

          {/* Price */}
          <form.Field name="price">
            {(field) => (
              <FormField
                label="Price"
                required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
              >
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-gray-400 pointer-events-none">
                    ৳
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                    className={cn(
                      inputCn(field.state.meta.isTouched && !!field.state.meta.errors[0]),
                      "pl-8"
                    )}
                  />
                </div>
              </FormField>
            )}
          </form.Field>

          {/* Category */}
          <form.Field name="categoryId">
            {(field) => (
              <FormField
                label="Category"
                required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
              >
                <Select
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v)}
                >
                  <SelectTrigger
                    className={cn(
                      "h-11 rounded-2xl border-[1.5px] text-[14px] ",
                      field.state.meta.isTouched && !!field.state.meta.errors[0]
                        ? "border-red-300 bg-red-50/30"
                        : "border-gray-200 focus:border-orange-400"
                    )}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[14px]">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="rounded-[10px]">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            )}
          </form.Field>

          {/* Image URL — full */}
          <form.Field name="imageUrl">
            {(field) => (
              <FormField
                label="Image URL"
                required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
                className="sm:col-span-2"
              >
                <div className="relative">
                  <input
                    type="url"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                      setImagePreview(e.target.value)
                    }}
                    onBlur={field.handleBlur}
                    placeholder="https://example.com/image.jpg"
                    className={cn(
                      inputCn(field.state.meta.isTouched && !!field.state.meta.errors[0]),
                      "pr-11"
                    )}
                  />
                  <ImageIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                </div>

                {/* Live preview strip */}
                <div className="flex items-center gap-3 bg-[#faf7f3] rounded-[10px] px-3.5 py-2.5 mt-1">
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-11 h-9.5 rounded-xl object-cover shrink-0"
                      onError={() => setImagePreview("")}
                    />
                  ) : (
                    <div className="w-11 h-9.5 rounded-xl bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0">
                      <ImageIcon className="h-4 w-4 text-white opacity-70" />
                    </div>
                  )}
                  <span className="text-[12px] text-gray-400 italic">
                    {imagePreview ? "Image preview" : "Paste a URL above to preview the image"}
                  </span>
                </div>
              </FormField>
            )}
          </form.Field>

        </div>
      </form>

      {/* ── Footer ── */}
      <div className="px-7 pb-7 flex flex-col gap-2.5">
        <form.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <button
              type="submit"
              form="update-meal-form"
              disabled={isSubmitting}
              className={cn(
                "w-full h-12 rounded-[14px] flex items-center justify-center gap-2",
                "text-[15px] font-semibold text-white border-none cursor-pointer",
                "bg-linear-to-br from-orange-500 to-rose-600",
                "hover:from-orange-600 hover:to-rose-700",
                "shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5",
                "transition-all ",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              )}
            >
              {isSubmitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Saving changes…</>
              ) : (
                <><Save className="h-4 w-4" /> Save Changes</>
              )}
            </button>
          )}
        </form.Subscribe>

        <button
          type="button"
          onClick={() => router.back()}
          className="w-full h-10 rounded-2xl border border-gray-200 bg-white text-[13.5px] font-semibold text-gray-600 flex items-center justify-center gap-2 hover:border-orange-300 hover:bg-amber-50 hover:text-orange-600 transition-all cursor-pointer "
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Meals
        </button>
      </div>

    </div>
  )
}