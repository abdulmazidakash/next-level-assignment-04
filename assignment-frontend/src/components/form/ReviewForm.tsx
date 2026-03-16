"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ReviewForm({ mealId }: { mealId: string }) {

    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")

    const submitReview = async () => {
        await fetch("/api/reviews", {
            method: "POST",
            body: JSON.stringify({
                mealId,
                rating,
                comment
            })
        })
    }

    return (
        <div className="space-y-3">

            <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            />

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <Button onClick={submitReview}>
                Submit Review
            </Button>

        </div>
    )
}