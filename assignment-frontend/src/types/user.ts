export interface User {
  id: string
  name: string
  email: string
  role: "ADMIN" | "CUSTOMER" | "PROVIDER"
  status: "ACTIVE" | "SUSPENDED"
  createdAt: string
}