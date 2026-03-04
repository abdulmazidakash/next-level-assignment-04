"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MealCardProps {
  meal: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    provider: {
      restaurantName: string;
      cuisineType: string;
    };
  };
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={meal?.imageUrl}
          alt={meal.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <CardContent className="p-5 space-y-3">
        
        {/* Title + Price */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold line-clamp-1">
            {meal.name}
          </h3>
          <span className="text-lg font-bold text-primary">
            ৳{meal.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {meal.description}
        </p>

        {/* Restaurant */}
        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary">
            {meal.provider.restaurantName}
          </Badge>

          <span className="text-xs text-muted-foreground">
            {meal.provider.cuisineType}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-5 pt-0">
        <Button className=" rounded-xl">
          Order Now
        </Button>
        <Link href={`/meals/${meal.id}`}><Button className=" rounded-xl">
          View Details
        </Button></Link>
      </CardFooter>
    </Card>
  );
}