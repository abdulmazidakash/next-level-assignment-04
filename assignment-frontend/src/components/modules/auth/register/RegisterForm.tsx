"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { UtensilsCrossed, Upload, User, Loader2 } from "lucide-react";
import { registerUser } from "@/services/auth";
import { uploadImageToImgbb } from "@/lib/uploadImage";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

const STEPS = [
  "Create your free account in under a minute",
  "Browse meals from top local restaurants",
  "Order and track delivery in real time",
]

export function RegisterForm() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", e.target.files);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const file = data.image?.[0];
      let imageUrl = "";
      if (file) imageUrl = await uploadImageToImgbb(file);

      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageUrl,
        role: "CUSTOMER",
      });

      // if (result?.success) {
      //   toast.success("Account created!");
      //   router.push("/");
      // } 
      if (result?.success) {
        toast.success(
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold">
              Welcome, {data.name.split(" ")[0]}! 🎉
            </span>
            <span className="text-sm text-muted-foreground">
              Your account has been created.
            </span>
          </div>
        );
        router.push("/");
        router.refresh();
      } else {
        toast.error(result?.message ?? "Registration failed");
      }
    } catch {
      toast.error("Image upload failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-225 grid grid-cols-1 md:grid-cols-2 bg-white border border-black/8 rounded-[24px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.06)]">

      {/* ── Left: form panel ── */}
      <div className="flex flex-col justify-center px-8 py-10 sm:px-10">

        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-6 md:hidden">
          <div className="w-8 h-8 rounded-[9px] bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0">
            <UtensilsCrossed className="h-4 w-4 text-white" />
          </div>
          <span className=" text-[1.1rem] font-bold text-gray-900">
            Food<span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">Hub</span>
          </span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className=" text-[1.6rem] font-bold text-gray-900 leading-tight">
            Create account
          </h1>
          <p className="text-[13.5px] text-gray-400 mt-1">
            Join FoodHub and start ordering today
          </p>
        </div>

        {/* Avatar upload */}
        <div className="flex items-center gap-4 mb-5">
          {/* Preview circle */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-15 h-15 rounded-full border-[3px] border-white shadow-md shadow-rose-100 shrink-0 overflow-hidden bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center transition-transform hover:scale-105"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Avatar preview" className="w-full h-full object-cover" />
            ) : (
              <User className="h-6 w-6 text-white/70" />
            )}
          </button>

          <div>
            <p className="text-[12.5px] font-semibold text-gray-600 mb-1.5">Profile Photo</p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[9px] border border-amber-200 bg-amber-50 text-amber-800 text-[12px] font-semibold hover:bg-amber-100 transition-colors"
            >
              <Upload className="h-3 w-3" />
              Upload photo
            </button>
            <p className="text-[11px] text-gray-400 mt-1">Optional · JPG, PNG up to 5MB</p>

            {/* Hidden real file input */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-gray-600">Full Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className={cn(
                "h-11 w-full rounded-2xl border-[1.5px] px-4 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none transition-all bg-white",
                errors.name
                  ? "border-red-300 bg-red-50/30 focus:border-red-400"
                  : "border-gray-200 focus:border-orange-400 focus:bg-orange-50/20"
              )}
            />
            {errors.name && (
              <p className="text-[11.5px] text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-gray-600">Email address</label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className={cn(
                "h-11 w-full rounded-2xl border-[1.5px] px-4 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none transition-all bg-white",
                errors.email
                  ? "border-red-300 bg-red-50/30 focus:border-red-400"
                  : "border-gray-200 focus:border-orange-400 focus:bg-orange-50/20"
              )}
            />
            {errors.email && (
              <p className="text-[11.5px] text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-gray-600">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Min. 6 characters"
              className={cn(
                "h-11 w-full rounded-2xl border-[1.5px] px-4 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none transition-all bg-white",
                errors.password
                  ? "border-red-300 bg-red-50/30 focus:border-red-400"
                  : "border-gray-200 focus:border-orange-400 focus:bg-orange-50/20"
              )}
            />
            {errors.password && (
              <p className="text-[11.5px] text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "mt-1 h-12 w-full rounded-[14px] flex items-center justify-center gap-2",
              "text-[15px] font-semibold text-white border-none cursor-pointer",
              "bg-linear-to-br from-orange-500 to-rose-600",
              "hover:from-orange-600 hover:to-rose-700",
              "shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5",
              "transition-all",
              "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            )}
          >
            {isSubmitting ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Creating account…</>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5 text-[12px] text-gray-300">
          <div className="flex-1 h-px bg-gray-100" />
          or
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Login CTA */}
        <p className="text-center text-[13.5px] text-gray-400">
          Already have an account?
          <Link
            href="/login"
            className="ml-1 font-semibold text-orange-500 hover:text-rose-600 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* ── Right: decorative panel ── */}
      <div className="relative hidden md:flex flex-col justify-between bg-linear-to-br from-[#1a1108] via-[#2d1a0a] to-[#1a0c06] p-10 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-orange-500/10" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-orange-500/10" />
        <div className="absolute bottom-44 right-5 w-20 h-20 rounded-full bg-orange-500/10" />

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-900/40 shrink-0">
            <UtensilsCrossed className="h-4.5 w-4.5 text-white" />
          </div>
          <span className=" text-[1.2rem] font-bold text-white leading-none">
            Food
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Hub
            </span>
          </span>
        </div>

        {/* Body */}
        <div className="relative flex-1 flex flex-col justify-center gap-4 py-8">
          <h2 className=" text-[1.85rem] font-bold text-white leading-tight">
            Start your{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              food journey
            </span>
          </h2>
          <p className="text-[13.5px] text-white/45 leading-relaxed max-w-60">
            Create a free account and unlock access to hundreds of local restaurants.
          </p>

          <div className="flex flex-col gap-3.5 mt-2">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5.5 h-5.5 rounded-full bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-[13px] text-white/60 leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-[11.5px] text-white/20">
          © {new Date().getFullYear()} FoodHub. All rights reserved.
        </p>
      </div>

    </div>
  );
}