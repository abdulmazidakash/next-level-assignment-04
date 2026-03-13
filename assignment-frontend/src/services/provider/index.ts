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

export const getAllPublicProviders = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/provider/public`,
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

/*
  Public Single Provider
*/
export const getSinglePublicProvider = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/provider/public/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // next: {
      //   revalidate: 3600,
      // },
      cache: "no-store"
    });

    return res.json();
  } catch (error: any) {
    console.log(error.message);
  }
};