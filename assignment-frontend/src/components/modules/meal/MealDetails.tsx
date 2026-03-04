/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import MealOrderSection from "./MealOrderSection";

export default function MealDetails({ meal }: { meal: any }) {
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
            {meal.reviews?.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet.</p>
            ) : (
              meal.reviews.map((review: any) => (
                <Card key={review.id} className="mb-4">
                  <CardContent>{review.comment}</CardContent>
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
                <MealOrderSection meal={meal} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}