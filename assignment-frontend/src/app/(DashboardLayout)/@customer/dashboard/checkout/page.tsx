"use client"

import { useState } from "react"
import { getCart, clearCart } from "@/lib/cart"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createOrder } from "@/services/order"

export default function CheckoutPage() {

  const router = useRouter()
  const [address, setAddress] = useState("")

  const handleOrder = async () => {

    const cart = getCart()

    const items = cart.map((c) => ({
      mealId: c.mealId,
      quantity: c.quantity
    }))

    const res = await createOrder({
      address,
      items
    })

    if (res?.data) {
      clearCart()
      router.push("/orders")
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      <h1 className="text-xl font-bold">Checkout</h1>

      <Input
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <Button onClick={handleOrder} className="w-full">
        Place Order (Cash On Delivery)
      </Button>
    </div>
  )
}