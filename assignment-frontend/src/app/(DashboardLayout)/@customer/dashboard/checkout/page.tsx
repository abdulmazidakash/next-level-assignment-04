"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { getCart, clearCart } from "@/lib/cart"
import { createOrder } from "@/services/order"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  ShoppingBag, MapPin, CreditCard, ShieldCheck,
  Info, CheckCircle2, Loader2, UtensilsCrossed,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function CheckoutPage() {
  const [address, setAddress]   = useState("")
  const [cart, setCart]         = useState<any[]>([])
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  useEffect(() => { setCart(getCart()) }, [])

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleOrder = async () => {
    if (cart.length === 0) { toast.error("Your cart is empty"); return }
    if (!address.trim())   { toast.error("Please enter a delivery address"); return }

    setLoading(true)
    try {
      const res = await createOrder({
        address,
        items: cart.map((item) => ({ mealId: item.mealId, quantity: item.quantity })),
      })

      if (res.success) {
        toast.success("Order placed successfully!")
        clearCart()
        router.push("/dashboard/my-orders")
      } else {
        toast.error(res.message ?? "Something went wrong")
      }
    } catch {
      toast.error("Failed to place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f2ec] rounded-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <div className="mb-7">
          <h1 className=" text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Check
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              out
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">Review your order and confirm delivery details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">

          {/* ── LEFT column ── */}
          <div className="flex flex-col gap-4">

            {/* Order items */}
            <SectionCard
              icon={<ShoppingBag className="h-3.5 w-3.5 text-amber-700" />}
              title="Order Items"
            >
              <div className="divide-y divide-gray-50">
                {cart.map((item) => (
                  <div key={item.mealId} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="relative w-11 h-9 rounded-[9px] overflow-hidden shrink-0">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="44px"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center">
                          <UtensilsCrossed className="h-4 w-4 text-white opacity-80" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[13.5px] text-gray-900 truncate">{item.name}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5">
                        {item.quantity} × ৳{item.price}
                      </p>
                    </div>
                    <span className=" text-[.9rem] font-bold text-orange-600 shrink-0">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Delivery address */}
            <SectionCard
              icon={<MapPin className="h-3.5 w-3.5 text-amber-700" />}
              title="Delivery Address"
            >
              <div className="flex flex-col gap-2">
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full delivery address, including street, area, and city…"
                  rows={3}
                  className={cn(
                    "w-full border-[1.5px] rounded-[14px] px-4 py-3",
                    "text-sm text-gray-900 placeholder:text-gray-400",
                    "resize-none outline-none leading-relaxed",
                    "transition-colors",
                    address.trim()
                      ? "border-orange-300 bg-orange-50/30"
                      : "border-gray-200 bg-white",
                    "focus:border-orange-400"
                  )}
                />
                <p className="flex items-center gap-1.5 text-[11.5px] text-gray-400">
                  <Info className="h-3 w-3 shrink-0" />
                  Include apartment/floor number if applicable
                </p>
              </div>
            </SectionCard>

            {/* Payment method */}
            <SectionCard
              icon={<CreditCard className="h-3.5 w-3.5 text-amber-700" />}
              title="Payment Method"
            >
              <div className="flex flex-col gap-2.5">
                {/* COD — active */}
                <div className="flex items-center gap-3 border-[1.5px] border-orange-400 bg-amber-50/50 rounded-[14px] px-4 py-3">
                  <div className="w-9 h-9 rounded-[10px] bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    <span className="text-[13px]">💵</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[13.5px] text-gray-900">Cash on Delivery</p>
                    <p className="text-[11.5px] text-gray-400 mt-0.5">Pay when your order arrives</p>
                    <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1.5">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      Available in your area
                    </span>
                  </div>
                  {/* selected indicator */}
                  <div className="w-4 h-4 rounded-full border-2 border-orange-500 bg-orange-500 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Online — disabled */}
                <div className="flex items-center gap-3 border-[1.5px] border-gray-100 bg-gray-50/50 rounded-[14px] px-4 py-3 opacity-50 cursor-not-allowed">
                  <div className="w-9 h-9 rounded-[10px] bg-gray-100 flex items-center justify-center shrink-0">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[13.5px] text-gray-700">Online Payment</p>
                    <p className="text-[11.5px] text-gray-400 mt-0.5">bKash, Nagad, Card</p>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ── RIGHT: summary ── */}
          <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden lg:sticky lg:top-6">
            <div className="bg-linear-to-br from-amber-50 to-orange-50 border-b border-amber-100 px-5 py-4">
              <h3 className=" text-[1.05rem] font-bold text-gray-900">
                Order Summary
              </h3>
            </div>

            <div className="px-5 py-5 flex flex-col gap-3">
              {/* Per-item lines */}
              {cart.map((item) => (
                <div key={item.mealId} className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-400 truncate max-w-40">
                    {item.name} ×{item.quantity}
                  </span>
                  <span className="font-semibold text-gray-900 shrink-0">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}

              <div className="flex justify-between items-center text-[13px]">
                <span className="text-gray-400">Delivery Fee</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-1">
                <span className="font-bold text-[15px] text-gray-900">Total</span>
                <span className=" text-[1.35rem] font-bold bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                  ৳{totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Items summary pill */}
              <div className="flex items-center justify-between bg-[#f7f2ec] rounded-xl px-3.5 py-2.5 text-[12px] text-gray-500">
                <span>{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
                <span className="font-semibold text-gray-700">Cash on Delivery</span>
              </div>

              {/* Place order */}
              <button
                onClick={handleOrder}
                disabled={loading}
                className={cn(
                  "mt-1 flex items-center justify-center gap-2 h-12 w-full rounded-[14px]",
                  "text-[15px] font-semibold text-white border-none",
                  "bg-linear-to-br from-orange-500 to-rose-600",
                  "hover:from-orange-600 hover:to-rose-700",
                  "shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5",
                  "transition-all cursor-pointer",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                )}
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Placing order…</>
                ) : (
                  <><CheckCircle2 className="h-4 w-4" /> Place Order</>
                )}
              </button>

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

// ── Section card wrapper ────────────────────────────────────
function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2.5 bg-linear-to-r from-amber-50 to-white border-b border-amber-100 px-5 py-3.5">
        <div className="w-8 h-8 rounded-[9px] bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <span className=" font-bold text-gray-900">
          {title}
        </span>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}