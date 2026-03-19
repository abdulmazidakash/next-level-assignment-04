"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getCart, removeFromCart, updateQuantity } from "@/lib/cart"
import { UtensilsCrossed, ShoppingBag, Trash2, ShieldCheck, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    setCart(getCart())
  }, [])

  const refresh = () => setCart(getCart())

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  // ── Empty state ──────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f2ec] flex items-center justify-center p-6 rounded-2xl">
        <div className="bg-white border border-black/[0.07] rounded-2xl p-10 flex flex-col items-center gap-4 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
            <ShoppingBag className="h-7 w-7 text-amber-700" />
          </div>
          <h2 className=" text-xl font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-400">Add some delicious meals to get started!</p>
          <Link
            href="/meals"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-linear-to-br from-orange-500 to-rose-600 text-white text-[13.5px] font-semibold shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all mt-2"
          >
            Browse Meals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f2ec] rounded-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <div className="mb-7">
          <h1 className="f text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            My{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Cart
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">

          {/* ── Cart items ── */}
          <div className="flex flex-col gap-3">
            {cart.map((item) => (
              <div
                key={item.mealId}
                className="bg-white border border-black/[0.07] rounded-[18px] p-4 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                {/* Image */}
                <div className="relative w-16 h-14 rounded-xl overflow-hidden shrink-0">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center">
                      <UtensilsCrossed className="h-5 w-5 text-white opacity-80" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[14.5px] text-gray-900 truncate">{item.name}</p>
                  <p className="text-[13px] text-gray-400 mt-0.5">৳{item.price} each</p>
                  <p className=" text-[.95rem] font-bold text-orange-600 mt-1">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                {/* Qty stepper */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => { updateQuantity(item.mealId, item.quantity - 1); refresh() }}
                    className="w-7.5 h-7.5 rounded-full border-[1.5px] border-gray-200 flex items-center justify-center text-[17px] font-medium text-gray-700 hover:border-orange-400 hover:bg-amber-50 hover:text-orange-600 transition-colors"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="text-[15px] font-bold text-gray-900 w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => { updateQuantity(item.mealId, item.quantity + 1); refresh() }}
                    className="w-7.5 h-7.5 rounded-full border-[1.5px] border-gray-200 flex items-center justify-center text-[17px] font-medium text-gray-700 hover:border-orange-400 hover:bg-amber-50 hover:text-orange-600 transition-colors"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => { removeFromCart(item.mealId); refresh() }}
                  className="w-8 h-8 rounded-[10px] border-[1.5px] border-red-200 bg-red-50 flex items-center justify-center hover:bg-red-100 hover:border-red-300 transition-colors shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-3.5 w-3.5 text-red-500" />
                </button>
              </div>
            ))}
          </div>

          {/* ── Order summary ── */}
          <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden lg:sticky lg:top-6">
            {/* Summary header */}
            <div className="bg-linear-to-br from-amber-50 to-orange-50 border-b border-amber-100 px-5 py-4">
              <h3 className=" text-[1.1rem] font-bold text-gray-900">
                Order Summary
              </h3>
            </div>

            <div className="px-5 py-5 flex flex-col gap-3">
              {/* Rows */}
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-gray-400">Items</span>
                <span className="font-semibold text-gray-900">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-semibold text-gray-900">৳{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="text-gray-400">Delivery Fee</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-1">
                <span className="font-bold text-[15px] text-gray-900">Total</span>
                <span className=" text-[1.4rem] font-bold bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                  ৳{totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Checkout button */}
              <Link
                href="/dashboard/checkout"
                className={cn(
                  "mt-2 flex items-center justify-center gap-2 h-12 rounded-[14px]",
                  "text-[15px] font-semibold text-white",
                  "bg-linear-to-br from-orange-500 to-rose-600",
                  "hover:from-orange-600 hover:to-rose-700",
                  "shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5",
                  "transition-all"
                )}
              >
                <ShoppingBag className="h-4 w-4" />
                Checkout
              </Link>

              {/* Secure note */}
              <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-gray-400">
                <ShieldCheck className="h-3 w-3" />
                Secure & encrypted checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}