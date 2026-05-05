"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, Clock, AlertCircle, Heart, ShoppingCart } from "lucide-react";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MealCardProps {
  meal: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isAvailable: boolean;
    availabilityStatus?: "available" | "out-of-stock" | "coming-soon" | "pre-order";
    category: {
      id: string;
      name: string;
    };
    provider: {
      id: string;
      restaurantName: string;
      cuisineType: string;
      avgRating?: number | null;
      totalReviews?: number;
    };
  };
}

export default function MealCard({ meal }: MealCardProps) {
  const {
    isAvailable = true,
    availabilityStatus = isAvailable ? "available" : "out-of-stock",
    provider,
  } = meal;

  const rating = provider.avgRating ?? 0;
  const hasRating = rating > 0;
  const reviewCount = provider.totalReviews ?? 0;

  const statusConfig: Record<string, { label: string; dotColor: string; badgeClass: string; icon?: React.ReactNode }> = {
    available: {
      label: "Available",
      dotColor: "bg-green-500",
      badgeClass: "bg-green-50 text-green-700 border border-green-200",
    },
    "out-of-stock": {
      label: "Out of Stock",
      dotColor: "bg-red-500",
      badgeClass: "bg-red-50 text-red-700 border border-red-200",
    },
    "coming-soon": {
      label: "Coming Soon",
      dotColor: "",
      badgeClass: "bg-slate-100 text-slate-600 border border-slate-200",
      icon: <Clock className="h-3 w-3" />,
    },
    "pre-order": {
      label: "Pre-order",
      dotColor: "",
      badgeClass: "bg-amber-50 text-amber-700 border border-amber-200",
      icon: <Star className="h-3 w-3" />,
    },
  };

  const status = statusConfig[availabilityStatus] ?? statusConfig.available;

  const handleAddToCart = () => {
    if (!isAvailable) {
      toast.error("This meal is currently unavailable");
      return;
    }

    addToCart({
      mealId: meal.id,
      name: meal.name,
      price: meal.price,
      imageUrl: meal.imageUrl,
      quantity: 1,
      providerId: meal.provider.id,
    });

    toast.success(
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden border border-gray-200">
          <Image
            src={meal.imageUrl || "/placeholder-meal.jpg"}
            alt={meal.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-sm">Added to cart</span>
          <span className="text-xs text-muted-foreground line-clamp-1">{meal.name}</span>
        </div>
      </div>,
      { duration: 4000, position: "bottom-right" }
    );
  };

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-4xl border border-black/[0.07] bg-card p-0",
        "shadow-sm hover:shadow-2xl hover:-translate-y-1.5",
        "transition-all duration-300 ease-out flex flex-col",
        !isAvailable && "opacity-70 grayscale-[0.3]"
      )}
    >
      {/* ── Image ── */}
      <div className="relative h-55 w-full overflow-hidden">
        {/* Bottom linear overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent z-10 pointer-events-none" />

        <Image
          src={meal.imageUrl || "/placeholder-meal.jpg"}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Cuisine type pill — bottom left */}
        <span className="absolute bottom-3.5 left-3.5 z-20 text-[11px] font-semibold tracking-wide text-white bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {provider.cuisineType}
        </span>

        {/* Status badge — top right */}
        <div className="absolute top-3 right-3 z-20">
          <span
            className={cn(
              "flex items-center gap-1.5 text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full",
              status.badgeClass
            )}
          >
            {status.icon ?? (
              <span className={cn("w-1.5 h-1.5 rounded-full", status.dotColor)} />
            )}
            {status.label}
          </span>
        </div>

        {/* Favourite button — top left, reveals on hover */}
        <button
          className={cn(
            "absolute top-3 left-3 z-20 rounded-full bg-white/90 backdrop-blur-sm p-2",
            "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100",
            "transition-all duration-250 hover:bg-white shadow-sm"
          )}
          aria-label="Add to favourites"
        >
          <Heart className="h-4 w-4 text-rose-500 transition-all hover:fill-rose-500" />
        </button>
      </div>

      {/* ── Body ── */}
      <CardContent className="px-5 pt-5 pb-0 flex flex-col gap-3 flex-1">
        {/* Name + Price */}
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              "font-bold leading-snug line-clamp-2 flex-1",
              "text-[1.1rem] sm:text-[1.15rem] text-gray-900 dark:text-gray-200",
              "",
              "group-hover:text-orange-600 transition-colors duration-200"
            )}
          >
            {meal.name}
          </h3>
          <span className="shrink-0 bg-linear-to-br from-orange-500 to-rose-600 text-white font-bold text-[1.05rem] px-3.5 py-1.5 rounded-full shadow-md shadow-rose-200 whitespace-nowrap leading-tight">
            ৳{meal.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13.5px] text-gray-500 leading-relaxed line-clamp-2 min-h-[2.6rem]">
          {meal.description}
        </p>

        {/* Provider + Rating */}
        <div className="flex items-center justify-between gap-2 flex-wrap pt-3 border-t border-gray-100">
          {/* Restaurant name */}
          <span className="text-[12.5px] font-semibold bg-amber-50 dark:bg-zinc-900 border border-amber-200 text-amber-800 px-2.5 py-1 rounded-full max-w-32.5 truncate">
            {provider.restaurantName}
          </span>

          {/* Rating */}
          {hasRating ? (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full shrink-0">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span className="text-[12.5px] font-semibold text-amber-800">{rating.toFixed(1)}</span>
              <span className="text-[11.5px] text-amber-600">({reviewCount})</span>
            </div>
          ) : (
            <span className="text-xs text-gray-400 italic">New</span>
          )}
        </div>
      </CardContent>

      {/* ── Footer ── */}
      <CardFooter className="px-5 pt-4 pb-5 flex gap-2.5">
        {/* Details */}
        <Button
          variant="outline"
          className="flex-1 h-10.5 rounded-[14px] border-orange-400/60 text-orange-600 hover:bg-orange-50 text-[13.5px] font-semibold transition-colors"
          asChild
        >
          <Link href={`/meals/${meal.id}`}>Details</Link>
        </Button>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={cn(
            "flex-1 h-10.5 gap-1.5 rounded-[14px] text-[13.5px] font-semibold",
            "bg-linear-to-br from-orange-500 to-rose-600 text-white",
            "hover:from-orange-600 hover:to-rose-700 hover:-translate-y-0.5",
            "shadow-md shadow-rose-200 hover:shadow-rose-300",
            "transition-all duration-200",
            !isAvailable && "opacity-55 shadow-none"
          )}
        >
          <ShoppingCart className="h-4 w-4" />
          {isAvailable ? "Add to Cart" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
}