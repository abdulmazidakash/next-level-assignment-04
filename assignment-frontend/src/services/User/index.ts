"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export const getAllUsers = async () => {

  try {
    const store = await cookies()
    const token = store.get("token")?.value

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
      {
        method: "GET",
        headers: {
          Authorization: token!,
        },
        cache: "no-store",
      }
    )

    if (!res.ok) {
      throw new Error("Failed to fetch users")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}


export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "SUSPENDED"
) => {

  try {
    const store = await cookies()
    const token = store.get("token")?.value

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify({ status }),
      }
    )

    revalidatePath("/dashboard/users")
  } catch (error) {
    console.error("Error updating user status:", error)
  }
}