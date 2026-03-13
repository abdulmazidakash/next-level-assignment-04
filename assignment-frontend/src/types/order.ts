export interface Meal {
  id: string
  name: string
  price: number
  imageUrl: string
}

export interface OrderItem {
  id: string
  quantity: number
  price: number
  meal: Meal
}

export interface Provider {
  id: string
  restaurantName: string
  cuisineType: string
}

export interface Order {
  id: string
  totalPrice: number
  status: "PLACED" | "DELIVERED" | "CANCELLED"
  address: string
  createdAt: string
  items: OrderItem[]
  provider: Provider
}