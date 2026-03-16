export interface CartItem {
  mealId: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  providerId: string
}

const CART_KEY = "foodhub_cart"

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export const addToCart = (item: CartItem) => {
  const cart = getCart()

  const existing = cart.find(c => c.mealId === item.mealId)

  if (existing) {
    existing.quantity += 1
  } else {
    cart.push(item)
  }

  saveCart(cart)
}

export const removeFromCart = (mealId: string) => {
  const cart = getCart().filter(c => c.mealId !== mealId)
  saveCart(cart)
}

export const updateQuantity = (mealId: string, quantity: number) => {
  const cart = getCart()

  const item = cart.find(c => c.mealId === mealId)

  if (!item) return

  if (quantity <= 0) {
    removeFromCart(mealId)
  } else {
    item.quantity = quantity
    saveCart(cart)
  }
}

export const clearCart = () => {
  localStorage.removeItem(CART_KEY)
}