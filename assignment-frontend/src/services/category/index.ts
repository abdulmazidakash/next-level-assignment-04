"use server";

import { cookies } from "next/headers";

export const getCategories = async () => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
      {
        headers: {
          Authorization: token!,
        },
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const createCategory = async (payload: { name: string }) => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
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

export const deleteCategory = async (id: string) => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token!,
        },
      }
    );

    return res.json();
  } catch (error) {
    console.error(error);
  }
};