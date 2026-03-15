/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const getAllMeals = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meals/public`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    console.log("Fetching from:", `${process.env.NEXT_PUBLIC_BASE_URL}/meals`);
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getSinglePublicMeal = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meals/public/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3600,
        },
      },
    );
    const result = await res.json();
    console.log(result)

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleMeal = async (id: string) => {
  try {
    const store = await cookies()
    const token = store.get("token")?.value
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meals/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        cache: "no-store",
      },
    );
    const result = await res.json();
    console.log(result)

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteMeal = async (id: string) => {
  try {
    const store = await cookies()
    const token = store.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meals/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token!,
      },
    });

    return res.json();
  } catch (error) {
    console.error("Error deleting meal:", error);
  }
};

export const updateMeal = async (id: string, payload: any) => {
  try {
    const store = await cookies()
    const token = store.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  } catch (error) {
    console.error("Error updating meal:", error);
  }
};

export const createMeal = async (payload: any) => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify(payload),
      }
    );

    return res.json();
  } catch (error) {
    console.error(error);
  }
};