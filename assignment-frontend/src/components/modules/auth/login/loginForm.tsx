"use client";

import { loginUser } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";
import { UtensilsCrossed, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

type FormValues = z.infer<typeof schema>;

// ── Feature list shown on the left panel ─────────────────────
const FEATURES = [
  "100+ restaurants in your city",
  "30-min average delivery",
  "Real-time order tracking",
  "100% halal certified meals",
]

export function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // const onSubmit = async (data: FormValues) => {
  //   const res = await loginUser(data);
  //   if (res?.success) {
  //     toast.success("Login successful");
  //     router.push("/");
  //   } else {
  //     toast.error(res?.message ?? "Login failed");
  //   }
  // };
  const onSubmit = async (data: FormValues) => {
    const res = await loginUser(data);
    if (res?.success) {
      toast.success(
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">
            Welcome back, {res?.data?.name?.split(" ")[0]}! 🎉
          </span>
          <span className="text-sm text-muted-foreground">
            You're now logged in.
          </span>
        </div>
      );
      router.push("/");
    } else {
      toast.error(res?.message ?? "Login failed");
    }
  };

  return (
    <div className="w-full max-w-225 grid grid-cols-1 md:grid-cols-2 min-h-130 bg-white border border-black/8 rounded-[24px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.06)]">

      {/* ── Left decorative panel ── */}
      <div className="relative hidden md:flex flex-col justify-between bg-linear-to-br from-[#1a1108] via-[#2d1a0a] to-[#1a0c06] p-10 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-orange-500/10" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-orange-500/10" />
        <div className="absolute bottom-40 right-5 w-20 h-20 rounded-full bg-orange-500/10" />

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

        {/* Headline */}
        <div className="relative flex-1 flex flex-col justify-center gap-4 py-8">
          <h2 className=" text-[1.85rem] font-bold text-white leading-tight">
            Great food,{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              one click away
            </span>
          </h2>
          <p className="text-[13.5px] text-white/45 leading-relaxed max-w-60">
            Order from the best local restaurants and get it delivered hot, fresh, and on time.
          </p>

          <div className="flex flex-col gap-2.5 mt-2">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-[13px] text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-linear-to-br from-orange-500 to-rose-600 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-[11.5px] text-white/20">
          © {new Date().getFullYear()} FoodHub. All rights reserved.
        </p>
      </div>

      {/* ── Right form panel ── */}
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
        <div className="mb-7">
          <h1 className=" text-[1.6rem] font-bold text-gray-900 leading-tight">
            Welcome back
          </h1>
          <p className="text-[13.5px] text-gray-400 mt-1">Sign in to your FoodHub account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-gray-600">
              Email address
            </label>
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
            <div className="flex items-center justify-between">
              <label className="text-[12.5px] font-semibold text-gray-600">
                Password
              </label>
              <Link href="/forgot-password" className="text-[12px] text-gray-400 hover:text-orange-500 transition-colors">
                Forgot password?
              </Link>
            </div>
            <input
              {...register("password")}
              type="password"
              placeholder="Your password"
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
              "transition-all ",
              "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            )}
          >
            {isSubmitting ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5 text-[12px] text-gray-300">
          <div className="flex-1 h-px bg-gray-100" />
          or
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Register CTA */}
        <p className="text-center text-[13.5px] text-gray-400">
          Don't have an account?
          <Link
            href="/register"
            className="ml-1 font-semibold text-orange-500 hover:text-rose-600 transition-colors"
          >
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}