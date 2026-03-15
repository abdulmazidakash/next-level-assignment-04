import { CartItem } from "@/types/cart"

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

export const addToCart = (item: CartItem) => {
  const cart = getCart()

  const existing = cart.find((c) => c.mealId === item.mealId)

  if (existing) {
    existing.quantity += 1
  } else {
    cart.push(item)
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}

export const removeFromCart = (mealId: string) => {
  const cart = getCart().filter((c) => c.mealId !== mealId)
  localStorage.setItem("cart", JSON.stringify(cart))
}

export const clearCart = () => {
  localStorage.removeItem("cart")
}