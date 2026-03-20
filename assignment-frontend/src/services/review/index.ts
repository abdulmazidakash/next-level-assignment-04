"use server"

import { cookies } from "next/headers"

export const createReview = async (data: any) => {

    const store = await cookies()
    const token = store.get("token")?.value

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reviews`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token || ""
            },
            body: JSON.stringify(data)
        }
    )

    const result = await res.json()

    if (!res.ok) {
        throw new Error(result.message)
    };
    console.log('index error comment: ;===> ', result)

    return result;
}

export const getMealReview = async (mealId: string) => {
    try {
        const store = await cookies()
        const token = store.get("token")?.value

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${mealId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token!,
                },
                cache: "no-store",
            }
        );

        const result = await res.json();
        // console.log('server result: ===>', result.data)

        return result.data;
    } catch (error: any) {
        console.log(error.message);
    }
};