"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-12 text-center max-w-xl w-full"
      >

        {/* Logo */}
        <Link href="/">
          <motion.span
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            FoodHub 🍱
          </motion.span>
        </Link>

        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 1.2 }}
          className="flex justify-center mt-6 mb-4"
        >
          <SearchX size={70} className="text-indigo-600" />
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">

          {/* Back Home */}
          <Link href="/">
            <Button className="flex gap-2 px-6">
              <Home size={18} />
              Back Home
            </Button>
          </Link>

          {/* Previous Page */}
          <Button
            variant="outline"
            className="flex gap-2 px-6"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
            Previous Page
          </Button>

        </div>

      </motion.div>
    </div>
  );
}