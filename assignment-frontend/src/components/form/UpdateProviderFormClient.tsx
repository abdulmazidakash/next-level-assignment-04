"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Home, Pencil, ArrowLeft, Loader2, Save } from "lucide-react";
import { updateProvider } from "@/services/provider";
import { cn } from "@/lib/utils";

const providerSchema = z.object({
  restaurantName: z.string().min(3, "Restaurant name must be at least 3 characters"),
  bio:            z.string().min(5, "Bio must be at least 5 characters"),
  address:        z.string().min(5, "Address must be at least 5 characters"),
  cuisineType:    z.string().min(3, "Cuisine type must be at least 3 characters"),
});

// ── Helpers ──────────────────────────────────────────────────
function initials(name?: string) {
  return (
    name
      ?.split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() ?? "?"
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

function FormField({
  label,
  required,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
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
      {error && <p className="text-[11.5px] text-red-500">{error}</p>}
    </div>
  );
}

export function UpdateProviderFormClient({ provider }: any) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      restaurantName: provider.restaurantName || "",
      bio:            provider.bio            || "",
      address:        provider.address        || "",
      cuisineType:    provider.cuisineType    || "",
    },
    validators: { onSubmit: providerSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving changes…");
      try {
        const res = await updateProvider(value);
        if (res?.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("Provider profile updated!", { id: toastId });
        router.push("/dashboard/provider-profile");
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
          <h2 className=" text-[1.2rem] font-bold text-gray-900 leading-tight">
            Update Provider Profile
          </h2>
          <p className="text-[13px] text-gray-400 mt-0.5">Edit your restaurant information</p>
        </div>
      </div>

      {/* ── Profile preview tile ── */}
      <div className="mx-7 mt-5 flex items-center gap-3.5 bg-[#faf7f3] rounded-[14px] px-4 py-3.5">
        <div className="w-13 h-13 rounded-[14px] bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0 shadow-sm">
          <span className=" text-[1.15rem] font-bold text-white">
            {initials(provider.restaurantName)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[14.5px] text-gray-900 truncate">{provider.restaurantName}</p>
          <p className="text-[12px] text-gray-400 mt-0.5 truncate">
            {[provider.cuisineType, provider.address].filter(Boolean).join(" · ")}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0">
          <Pencil className="h-2.5 w-2.5" />
          Editing
        </div>
      </div>

      {/* ── Form ── */}
      <form
        id="provider-update-form"
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
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
                className="sm:col-span-2"
              >
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Your restaurant name"
                  className={inputCn(field.state.meta.isTouched && !!field.state.meta.errors[0])}
                />
              </FormField>
            )}
          </form.Field>

          {/* Bio — full */}
          <form.Field name="bio">
            {(field) => (
              <FormField
                label="Bio"
                required
                error={field.state.meta.isTouched ? field.state.meta.errors[0]?.message : undefined}
                className="sm:col-span-2"
              >
                <textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Describe your restaurant, specialties, and story…"
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
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Street, area, city"
                  className={inputCn(field.state.meta.isTouched && !!field.state.meta.errors[0])}
                />
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
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="e.g. Bangladeshi, Italian…"
                  className={inputCn(field.state.meta.isTouched && !!field.state.meta.errors[0])}
                />
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
              form="provider-update-form"
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
                <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
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
          Back to Profile
        </button>
      </div>

    </div>
  );
}