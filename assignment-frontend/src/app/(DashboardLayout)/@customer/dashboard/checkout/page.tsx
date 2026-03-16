"use client"

import { useEffect, useState } from "react"
import { getCart, clearCart } from "@/lib/cart"
import { createOrder } from "@/services/order"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {

  const [address, setAddress] = useState("")
  const [cart, setCart] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const cartData = getCart()
    setCart(cartData)
  }, [])

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleOrder = async () => {

    if (cart.length === 0) {
      toast.error("Cart is empty")
      return
    }

    if (!address) {
      toast.error("Address required")
      return
    }

    const items = cart.map(item => ({
      mealId: item.mealId,
      quantity: item.quantity
    }))

    const res = await createOrder({
      address,
      items
    });

    console.log('order response: ===>', res)

    if (res.success) {
      toast.success("Order placed")
      clearCart()
      router.push("/dashboard/my-orders")
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-6">

      <h1 className="text-3xl font-bold">Checkout</h1>

      {/* Cart Items */}
      {cart.map(item => (
        <div
          key={item.mealId}
          className="flex justify-between border p-4 rounded"
        >
          <p>{item.name}</p>
          <p>{item.quantity} × ৳{item.price}</p>
        </div>
      ))}

      <h2 className="text-xl font-bold">
        Total: ৳{total}
      </h2>

      <textarea
        className="border w-full p-4 rounded"
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <Button onClick={handleOrder}>
        Place Order (Cash On Delivery)
      </Button>

    </div>
  )
}