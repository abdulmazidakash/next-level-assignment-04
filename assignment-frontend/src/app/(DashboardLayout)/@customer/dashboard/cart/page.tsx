"use client"

import { useEffect, useState } from "react"
import { getCart, removeFromCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    setCart(getCart())
  }, [])

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.mealId}
          className="flex justify-between border p-4 rounded"
        >
          <div>
            <p className="font-semibold">{item.name}</p>
            <p>Qty: {item.quantity}</p>
          </div>

          <div className="space-x-3">
            <span>৳{item.price}</span>

            <Button
              variant="destructive"
              onClick={() => {
                removeFromCart(item.mealId)
                setCart(getCart())
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>৳{total}</span>
      </div>

      <Link href="/checkout">
        <Button className="w-full">Checkout</Button>
      </Link>
    </div>
  )
}