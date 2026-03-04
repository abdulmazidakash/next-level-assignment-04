/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const createOrder = async (orderData: any) => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(orderData),
    });
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};