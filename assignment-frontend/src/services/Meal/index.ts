/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

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