/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import MealOrderSection from "./MealOrderSection";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getMealReview } from "@/services/review";

export default function MealDetails({ meal }: { meal: any }) {

  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await getMealReview(meal.id);
      setReviews(data || []);
    };

    if (meal?.id) loadReviews();
  }, [meal?.id]);

  console.log('reviews data: ===>',reviews)

  if (!meal) return <div className="text-center py-20">Meal not found</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image src={meal.imageUrl} alt={meal.name} fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-10 left-10 text-white">
          <Badge className="mb-3 bg-primary text-white">{meal.category?.name}</Badge>
          <h1 className="text-4xl font-bold">{meal.name}</h1>
          <p className="text-lg mt-2 opacity-90">৳{meal.price}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10">
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">About this meal</h2>
            <p className="text-muted-foreground leading-relaxed">{meal.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

            {reviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet.</p>
            ) : (
              reviews.map((review: any) => (
                <Card key={review.id} className="mb-4">
                  <CardContent className="space-y-2">
                    <p className="font-semibold">
                      {review.customer?.name}
                    </p>
                    <p>{"⭐".repeat(review.rating)}</p>
                    <p className="text-muted-foreground">
                      {review.comment}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div>
          <Card className="rounded-2xl shadow-lg sticky top-20">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Restaurant</h3>
                <p className="text-primary font-medium">{meal.provider?.restaurantName}</p>
                <p className="text-sm text-muted-foreground">{meal.provider?.address}</p>
                <p className="text-sm text-muted-foreground">
                  Cuisine: {meal.provider?.cuisineType}
                </p>
              </div>

              <div className="border-t pt-6">
                <p className="text-2xl font-bold mb-4">৳{meal.price}</p>
                {/* Client-side order modal */}
                {/* <MealOrderSection meal={meal} /> */}
                <Button
                  onClick={() => {
                    addToCart({
                      mealId: meal.id,
                      name: meal.name,
                      price: meal.price,
                      imageUrl: meal.imageUrl,
                      quantity: 1,
                      providerId: meal.provider.id,
                    })

                    toast.success("Added to cart")
                  }}
                >
                  Add To Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}