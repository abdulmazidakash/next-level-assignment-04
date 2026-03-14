/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
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



export const getProviderOrders = async () => {
  try {
    const store = await cookies()
    const token = store.get("token")?.value

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/provider/orders`,
      {
        headers: {
          Authorization: token!,
        },
        cache: "no-store",
      }
    )

    return res.json()
  } catch (error) {
    console.error("Error fetching provider orders:", error);
  }
}

export const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  try {
    const store = await cookies()
    const token = store.get("token")?.value

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/provider/order/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify({ status }),
      }
    )

    revalidatePath("/dashboard/orders")
  } catch (error) {
    console.error("Error updating order status:", error);
  }
}

export const getOwnProvider = async () => {
  try {
    const store = await cookies()
    const token = store.get("token")?.value

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/provider/me`,
      {
        headers: {
          Authorization: token!,
        },
        cache: "no-store",
      }
    )

    return res.json()
  } catch (error) {
    console.error("Error fetching own provider:", error);
  }
}


export const getProviderMeals = async () => {
  try {
    const store = await cookies()
    const token = store.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meals`, {
      headers: {
        Authorization: token!,
      },
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.error("Error fetching provider meals:", error);
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

