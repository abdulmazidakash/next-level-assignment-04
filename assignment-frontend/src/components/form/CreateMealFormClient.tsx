"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { UtensilsCrossed, Loader2, Plus, Upload, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/services/category";
import { createMeal } from "@/services/Meal";
import { cn } from "@/lib/utils";
import { uploadImageToImgbb } from "@/lib/uploadImage";

const mealSchema = z.object({
  name:        z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price:       z.number().min(1, "Price must be at least 1"),
  imageUrl:    z.string().optional(),
  categoryId:  z.string().min(1, "Category is required"),
});

function FormField({
  label, required, error, children, className,
}: {
  label: string; required?: boolean; error?: string;
  children: React.ReactNode; className?: string;
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
  );
}

function inputCn(hasError?: boolean) {
  return cn(
    "h-11 w-full rounded-[12px] border-[1.5px] px-4 text-[14px] text-gray-900",
    "placeholder:text-gray-400 outline-none transition-all bg-white ",
    hasError
      ? "border-red-300 bg-red-50/30 focus:border-red-400"
      : "border-gray-200 focus:border-orange-400 focus:bg-orange-50/20"
  );
}

export function CreateMealFormClient() {
  const [categories, setCategories]     = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile]       = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCategories().then((res) => setCategories(res?.data || []));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const form = useForm({
    defaultValues: { name: "", description: "", price: 0, imageUrl: "", categoryId: "" },
    validators: { onSubmit: mealSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating meal…");
      try {
        let imageUrl = "";
        if (imageFile) imageUrl = await uploadImageToImgbb(imageFile);
        const res = await createMeal({ ...value, imageUrl });
        if (res?.error) { toast.error(res.error.message, { id: toastId }); return; }
        toast.success("Meal created!", { id: toastId });
        form.reset();
        clearImage();
      } catch {
        toast.error("Image upload failed", { id: toastId });
      }
    },
  });

  return (
    <div className="w-full max-w-160 bg-white border border-black/8 rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.04)]">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 bg-linear-to-r from-amber-50 to-white border-b border-amber-100 px-7 py-5">
        <div className="w-10.5 h-10.5 rounded-2xl bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0 shadow-md shadow-rose-200">
          <UtensilsCrossed className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-[1.25rem] font-bold text-gray-900 leading-tight">
            Create New Meal
          </h2>
          <p className="text-[13px] text-gray-400 mt-0.5">Add a meal to your restaurant menu</p>
        </div>
      </div>

      {/* ── Form ── */}
      <form
        id="meal-form"
        onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}
        className="px-7 py-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Name */}
          <form.Field name="name">
            {(field) => (
              <FormField label="Meal Name" required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
                className="sm:col-span-2"
              >
                <input value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur} placeholder="e.g. Kacchi Biryani"
                  className={inputCn(field.state.meta.isTouched && !!field.state.meta.errors[0])}
                />
              </FormField>
            )}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <FormField label="Description" required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
                className="sm:col-span-2"
              >
                <textarea value={field.state.value}
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
              <FormField label="Price" required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
              >
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-gray-400 pointer-events-none">৳</span>
                  <input type="number" min={0} value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                    className={cn(inputCn(field.state.meta.isTouched && !!field.state.meta.errors[0]), "pl-8")}
                  />
                </div>
              </FormField>
            )}
          </form.Field>

          {/* Category */}
          <form.Field name="categoryId">
            {(field) => (
              <FormField label="Category" required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
              >
                <Select value={field.state.value} onValueChange={(v) => field.handleChange(v)}>
                  <SelectTrigger className={cn(
                    "h-11 rounded-2xl border-[1.5px] text-[14px] ",
                    field.state.meta.isTouched && !!field.state.meta.errors[0]
                      ? "border-red-300 bg-red-50/30" : "border-gray-200 focus:border-orange-400"
                  )}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[14px]">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="rounded-[10px]">{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            )}
          </form.Field>

          {/* ── Image Upload — full width ── */}
          <form.Field name="imageUrl">
            {() => (
              <FormField label="Meal Image" required className="sm:col-span-2">
                {imagePreview ? (
                  /* Has image — preview card */
                  <div className="relative flex items-center gap-4 bg-[#faf7f3] border border-amber-100 rounded-[14px] px-4 py-3.5">
                    <div className="relative w-18 h-15 rounded-[10px] overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-gray-800 truncate">{imageFile?.name}</p>
                      <p className="text-[11.5px] text-gray-400 mt-0.5">
                        {imageFile ? `${(imageFile.size / 1024).toFixed(0)} KB` : ""}
                      </p>
                      <button type="button" onClick={() => fileRef.current?.click()}
                        className="mt-1 text-[11.5px] font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                        Replace image
                      </button>
                    </div>
                    {/* Clear */}
                    <button type="button" onClick={clearImage}
                      className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors"
                      aria-label="Remove image">
                      <X className="h-3 w-3 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  /* No image — dropzone */
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className={cn(
                      "w-full flex flex-col items-center justify-center gap-2.5 py-8",
                      "border-[1.5px] border-dashed border-gray-200 rounded-[14px]",
                      "bg-[#faf7f3] hover:border-orange-400 hover:bg-orange-50/30",
                      "transition-all group cursor-pointer"
                    )}>
                    <div className="w-10 h-10 rounded-[10px] bg-white border border-gray-200 flex items-center justify-center group-hover:border-orange-300 group-hover:bg-amber-50 transition-all">
                      <Upload className="h-4.5 w-4.5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="text-[13.5px] font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
                        Click to upload image
                      </p>
                      <p className="text-[11.5px] text-gray-400 mt-0.5">JPG, PNG, WebP · Max 5 MB</p>
                    </div>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </FormField>
            )}
          </form.Field>

        </div>
      </form>

      {/* ── Footer ── */}
      <div className="px-7 pb-7 flex flex-col gap-3">
        <form.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <button type="submit" form="meal-form" disabled={isSubmitting}
              className={cn(
                "w-full h-12 rounded-[14px] flex items-center justify-center gap-2",
                "text-[15px] font-semibold text-white border-none cursor-pointer",
                "bg-linear-to-br from-orange-500 to-rose-600",
                "hover:from-orange-600 hover:to-rose-700",
                "shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5",
                "transition-all ",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              )}>
              {isSubmitting
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating meal…</>
                : <><Plus className="h-5 w-5" /> Create Meal</>}
            </button>
          )}
        </form.Subscribe>
        <p className="text-center text-[12px] text-gray-400">
          Fields marked <span className="text-rose-500 font-semibold">*</span> are required
        </p>
      </div>

    </div>
  );
}