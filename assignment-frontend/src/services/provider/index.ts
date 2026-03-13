/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const getMyProvider = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/provider`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getSingleProvider = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/provider/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error.message);
  }
};