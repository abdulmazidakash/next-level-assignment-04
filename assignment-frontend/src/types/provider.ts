export interface Provider {
  id: string
  restaurantName: string
  bio: string
  address: string
  cuisineType: string
  isApproved: boolean
  _count: {
    meals: number
  }
  user: {
    name: string
  }

  meals: Meal[]
}

export interface Meal {
  id: string
  name: string
  price: number
}