/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";


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


// export const getAllMeals = async () => {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//     console.log('get all meals baseurl: ===>',baseUrl)
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/meals/public`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         cache: "no-store",
//       },
//     );
//     console.log("Fetching from:", `${process.env.NEXT_PUBLIC_BASE_URL}/meals`);
//     const result = await res.json();

//     return result;
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };

// export const getAllMeals = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/meals/public`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         cache: "no-store",
//       }
//     );

//     const result = await res.json();

//     console.log("API RESULT: ===>", result); // 👈 IMPORTANT

//     return result;
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };

export const getAllMeals = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meals/public`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("API Error Status:", res.status);
      return { success: false, data: [] }; 
    }

    const result = await res.json();
    return result || { success: false, data: [] };

  } catch (error: any) {
    console.error("Fetch Error:", error.message);
    return { success: false, data: [] };
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
