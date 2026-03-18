"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, UtensilsCrossed } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#f7f2ec] flex items-center justify-center px-4 py-10 overflow-hidden">

      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-linear(rgba(255,107,53,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.34, 1.2, 0.64, 1] }}
        className="relative z-10 bg-white border border-black/[0.07] rounded-[28px] shadow-[0_24px_64px_rgba(0,0,0,0.09),0_4px_16px_rgba(0,0,0,0.05)] w-full max-w-130 px-10 py-14 text-center"
      >
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 mb-8 group"
        >
          <div className="w-9 h-9 rounded-[10px] bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-md shadow-rose-200 group-hover:shadow-rose-300 transition-shadow shrink-0">
            <UtensilsCrossed className="h-4.25 w-4.25 text-white" />
          </div>
          <span className=" text-[1.15rem] font-bold text-gray-900 leading-none">
            Food
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Hub
            </span>
          </span>
        </Link>

        {/* Wobbling icon */}
        <motion.div
          animate={{ rotate: [0, -4, 4, -4, 4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-25 h-25 rounded-full bg-linear-to-br from-orange-50 to-rose-50 border-2 border-orange-100 flex items-center justify-center mx-auto mb-7"
        >
          <Search className="h-12 w-12 text-orange-500" strokeWidth={1.5} />
        </motion.div>

        {/* Fun tag */}
        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[12px] font-semibold px-3 py-1.5 rounded-full mb-5">
          <Home className="h-3 w-3" />
          Looks like this meal is off the menu
        </div>

        {/* 404 */}
        <h1 className=" text-[5rem] font-bold leading-none bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent mb-2">
          404
        </h1>

        <h2 className=" text-[1.5rem] font-bold text-gray-900 mb-3">
          Page Not Found
        </h2>

        <p className="text-[14px] text-gray-400 leading-relaxed max-w-[320px] mx-auto mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-2.5 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-[13px] border-none bg-linear-to-br from-orange-500 to-rose-600 text-white text-[14px] font-semibold shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all"
          >
            <Home className="h-4 w-4" />
            Back Home
          </Link>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-[13px] border border-gray-200 bg-white text-[14px] font-semibold text-gray-600 hover:border-orange-300 hover:bg-amber-50 hover:text-orange-600 transition-all cursor-pointer "
          >
            <ArrowLeft className="h-4 w-4" />
            Previous Page
          </button>
        </div>

        {/* Footer note */}
        <p className="text-[12px] text-gray-400 mt-7">
          Think this is a mistake?{" "}
          <Link
            href="/contact"
            className="font-semibold text-orange-500 hover:text-rose-600 transition-colors"
          >
            Contact support
          </Link>
        </p>
      </motion.div>
    </div>
  );
}