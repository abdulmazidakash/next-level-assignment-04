"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { getCart, removeFromCart, updateQuantity } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CartPage() {

  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    setCart(getCart())
  }, [])

  const refresh = () => setCart(getCart())

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="container mx-auto py-10 space-y-6">

      <h1 className="text-3xl font-bold">My Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map(item => (

        <div
          key={item.mealId}
          className="flex items-center justify-between border p-4 rounded-lg"
        >

          <div className="flex items-center gap-4">

            <Image
              src={item.imageUrl}
              alt={item.name}
              width={60}
              height={60}
              className="rounded"
            />

            <div>
              <p className="font-semibold">{item.name}</p>
              <p>৳{item.price}</p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <Button
              size="sm"
              onClick={() => {
                updateQuantity(item.mealId, item.quantity - 1)
                refresh()
              }}
            >
              -
            </Button>

            {item.quantity}

            <Button
              size="sm"
              onClick={() => {
                updateQuantity(item.mealId, item.quantity + 1)
                refresh()
              }}
            >
              +
            </Button>

          </div>

          <Button
            variant="destructive"
            onClick={() => {
              removeFromCart(item.mealId)
              refresh()
            }}
          >
            Remove
          </Button>

        </div>
      ))}

      <div className="text-right space-y-4">

        <p className="text-xl font-bold">
          Total: ৳{total}
        </p>

        <Link href="/dashboard/checkout">
          <Button>
            Checkout
          </Button>
        </Link>

      </div>

    </div>
  )
}