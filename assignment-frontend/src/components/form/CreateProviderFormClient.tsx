"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Home, MapPin, UtensilsCrossed, FileText, Loader2, Plus, ArrowLeft } from "lucide-react";
import { createProvider } from "@/services/provider";
import { cn } from "@/lib/utils";

const providerSchema = z.object({
  restaurantName: z.string().min(3, "Restaurant name must be at least 3 characters"),
  bio:            z.string().min(5, "Bio must be at least 5 characters"),
  address:        z.string().min(5, "Address must be at least 5 characters"),
  cuisineType:    z.string().min(3, "Cuisine type must be at least 3 characters"),
});

// ── Helpers ──────────────────────────────────────────────────
function inputCn(hasError?: boolean) {
  return cn(
    "h-11 w-full rounded-[12px] border-[1.5px] px-4 text-[14px] text-gray-900",
    "placeholder:text-gray-400 outline-none transition-all bg-white ",
    hasError
      ? "border-red-300 bg-red-50/30 focus:border-red-400"
      : "border-gray-200 focus:border-orange-400 focus:bg-orange-50/20"
  );
}

function FormField({
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-[12.5px] font-semibold text-gray-600">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[11.5px] text-gray-400">{hint}</p>}
      {error && <p className="text-[11.5px] text-red-500">{error}</p>}
    </div>
  );
}

export function CreateProviderFormClient() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      restaurantName: "",
      bio:            "",
      address:        "",
      cuisineType:    "",
    },
    validators: { onSubmit: providerSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating provider profile…");
      try {
        const res = await createProvider(value);
        if (res?.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("Provider profile created!", { id: toastId });
        form.reset();
        router.push("/provider-dashboard/profile");
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div className="w-full max-w-160 bg-white border border-black/8 rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.04)]">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 bg-linear-to-r from-amber-50 to-white border-b border-amber-100 px-7 py-5">
        <div className="w-10.5 h-10.5 rounded-2xl bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0 shadow-md shadow-rose-200">
          <Home className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-[1.2rem] font-bold text-gray-900 leading-tight">
            Create Provider Profile
          </h2>
          <p className="text-[13px] text-gray-400 mt-0.5">
            Set up your restaurant to start listing meals
          </p>
        </div>
      </div>

      {/* ── Steps banner ── */}
      <div className="mx-7 mt-5 flex items-start gap-3 bg-[#faf7f3] rounded-[14px] px-4 py-4">
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5">
          1
        </div>
        <div>
          <p className="text-[13px] font-semibold text-gray-800">Fill in your restaurant details</p>
          <p className="text-[12px] text-gray-400 mt-0.5 leading-relaxed">
            Once created, you can start adding meals and receiving orders from customers.
          </p>
        </div>
      </div>

      {/* ── Form ── */}
      <form
        id="provider-form"
        onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}
        className="px-7 py-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Restaurant Name — full */}
          <form.Field name="restaurantName">
            {(field) => (
              <FormField
                label="Restaurant Name"
                required
                hint="The public name customers will see"
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
                className="sm:col-span-2"
              >
                <div className="relative">
                  <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="e.g. Fakruddin's, Mezban Kitchen…"
                    className={cn(
                      inputCn(field.state.meta.isTouched && !!field.state.meta.errors[0]),
                      "pl-10"
                    )}
                  />
                </div>
              </FormField>
            )}
          </form.Field>

          {/* Bio — full */}
          <form.Field name="bio">
            {(field) => (
              <FormField
                label="Bio"
                required
                hint="A short description of your restaurant and specialties"
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
                className="sm:col-span-2"
              >
                <textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Tell customers what makes your food special…"
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

          {/* Address */}
          <form.Field name="address">
            {(field) => (
              <FormField
                label="Address"
                required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
              >
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Street, area, city"
                    className={cn(
                      inputCn(field.state.meta.isTouched && !!field.state.meta.errors[0]),
                      "pl-10"
                    )}
                  />
                </div>
              </FormField>
            )}
          </form.Field>

          {/* Cuisine Type */}
          <form.Field name="cuisineType">
            {(field) => (
              <FormField
                label="Cuisine Type"
                required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
              >
                <div className="relative">
                  <UtensilsCrossed className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="e.g. Bangladeshi, Italian…"
                    className={cn(
                      inputCn(field.state.meta.isTouched && !!field.state.meta.errors[0]),
                      "pl-10"
                    )}
                  />
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
              form="provider-form"
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
                <><Loader2 className="h-4 w-4 animate-spin" /> Creating profile…</>
              ) : (
                <><Plus className="h-5 w-5" /> Create Provider Profile</>
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
          Back
        </button>

        <p className="text-center text-[12px] text-gray-400">
          Fields marked <span className="text-rose-500 font-semibold">*</span> are required
        </p>
      </div>

    </div>
  );
}