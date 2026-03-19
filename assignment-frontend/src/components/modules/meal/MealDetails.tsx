/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getMealReview } from "@/services/review";
import {
  Star,
  MapPin,
  Home,
  Clock,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MealDetails({ meal }: { meal: any }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getMealReview(meal.id);
      setReviews(data || []);
    };
    if (meal?.id) load();
  }, [meal?.id]);

  if (!meal) return <div className="text-center py-20">Meal not found</div>;

  const rating = meal.provider?.avgRating ?? 0;
  const reviewCount = meal.provider?.totalReviews ?? reviews.length ?? 0;

  // ── Rating bar distribution (derive from reviews or fallback)
  const bars = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
    return { star, pct };
  });

  const handleAddToCart = () => {
    addToCart({
      mealId: meal.id,
      name: meal.name,
      price: meal.price,
      imageUrl: meal.imageUrl,
      quantity: qty,
      providerId: meal.provider.id,
    });
    setAdded(true);
    toast.success(`${qty}× ${meal.name} added to cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  // ── Helpers ─────────────────────────────────────────────
  const Stars = ({ n, size = 14 }: { n: number; size?: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i <= n ? "fill-amber-500 text-amber-500" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>
  );

  const initials = (name: string) =>
    name
      ?.split(" ")
      .slice(0, 2)
      .map((w: string) => w[0])
      .join("")
      .toUpperCase() ?? "?";

  return (
    <div className="min-h-screen bg-[#f7f2ec]">
      {/* ── HERO ─────────────────────────────────────────── */}
      <div className="relative h-105 w-full overflow-hidden">
        <Image
          src={meal.imageUrl}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-[8s] ease-out hover:scale-105"
          unoptimized
        />
        {/* linear */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />

        {/* hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 flex flex-col gap-3">
          <Badge className="self-start bg-linear-to-r from-orange-500 to-rose-600 text-white border-0 text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
            {meal.category?.name}
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-md">
            {meal.name}
          </h1>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-2xl font-bold text-white">৳{meal.price}</span>
            {rating > 0 && (
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-3 py-1.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-white">{rating.toFixed(1)}</span>
                <span className="text-xs text-white/75">({reviewCount.toLocaleString()})</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────── */}
      <div className="max-w-270 mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* ── LEFT ─────────────────────────────── */}
          <div className="space-y-6">

            {/* About */}
            <section className="bg-white border border-black/[0.07] rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">
                About this meal
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">{meal.description}</p>

              {/* Tags */}
              {meal.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {meal.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[12px] font-medium bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Reviews */}
            <section className="bg-white border border-black/[0.07] rounded-2xl p-6 sm:p-8">
              <h2 className=" text-xl font-bold text-gray-900 mb-5 pb-4 border-b border-gray-100">
                Customer Reviews
              </h2>

              {/* Rating summary */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-8 flex-wrap mb-6 pb-6 border-b border-gray-100">
                  {/* Big number */}
                  <div className="text-center">
                    <div className=" text-5xl font-bold text-gray-900 leading-none">
                      {rating > 0 ? rating.toFixed(1) : (
                        reviews.length
                          ? (reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length).toFixed(1)
                          : "—"
                      )}
                    </div>
                    <Stars n={Math.round(rating || 0)} size={13} />
                    <p className="text-xs text-gray-400 mt-1">{reviews.length} reviews</p>
                  </div>

                  {/* Bars */}
                  <div className="flex-1 min-w-40 space-y-1.5">
                    {bars.map(({ star, pct }) => (
                      <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-2 text-right">{star}</span>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-orange-400 to-rose-500 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-7">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Review list */}
              {reviews.length === 0 ? (
                <p className="text-center text-gray-400 italic py-8 text-sm">No reviews yet. Be the first!</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review: any) => (
                    <div
                      key={review.id}
                      className="border border-gray-100 rounded-[14px] p-4 bg-[#fdfcfb] hover:shadow-md transition-shadow"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white font-bold text-[12px] shrink-0">
                          {initials(review.customer?.name ?? "?")}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{review.customer?.name}</p>
                          {review.createdAt && (
                            <p className="text-xs text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric", month: "long", year: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                      <Stars n={review.rating} size={13} />
                      <p className="mt-2 text-[13.5px] text-gray-600 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* ── RIGHT SIDEBAR ─────────────────────── */}
          <div>
            <div className="lg:sticky lg:top-6 bg-white border border-black/[0.07] rounded-2xl overflow-hidden shadow-lg">

              {/* Restaurant banner */}
              <div className="bg-linear-to-br from-amber-50 to-orange-50 border-b border-amber-100 px-6 py-5">
                <p className="text-[10.5px] font-semibold tracking-widest text-gray-400 uppercase mb-1">Served by</p>
                <p className="text-lg font-bold text-gray-900">
                  {meal.provider?.restaurantName}
                </p>
                <div className="mt-2 space-y-1 text-[12.5px] text-gray-600">
                  {meal.provider?.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 opacity-50 shrink-0" />
                      <span>{meal.provider.address}</span>
                    </div>
                  )}
                  {meal.provider?.cuisineType && (
                    <div className="flex items-center gap-2">
                      <Home className="h-3.5 w-3.5 opacity-50 shrink-0" />
                      <span>{meal.provider.cuisineType} cuisine</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order section */}
              <div className="p-6 space-y-5">
                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ৳{meal.price}
                  </span>
                  <span className="text-sm text-gray-400">/ serving</span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-full border-[1.5px] border-gray-200 flex items-center justify-center text-lg text-gray-700 hover:border-orange-400 hover:bg-amber-50 hover:text-orange-600 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-base font-semibold text-gray-900 w-6 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="w-9 h-9 rounded-full border-[1.5px] border-gray-200 flex items-center justify-center text-lg text-gray-700 hover:border-orange-400 hover:bg-amber-50 hover:text-orange-600 transition-colors"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-400">quantity</span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between text-sm bg-[#f7f2ec] rounded-xl px-4 py-3">
                  <span className="text-gray-500">Total</span>
                  <span className="font-bold text-gray-900 text-base">৳{meal.price * qty}</span>
                </div>

                {/* Add to cart */}
                <Button
                  onClick={handleAddToCart}
                  className={cn(
                    "w-full h-12 rounded-[14px] text-[15px] font-semibold gap-2 transition-all",
                    added
                      ? "bg-linear-to-r from-green-500 to-emerald-600 shadow-green-200"
                      : "bg-linear-to-br from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 shadow-rose-200",
                    "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  )}
                >
                  {added ? (
                    <><Check className="h-5 w-5" /> Added!</>
                  ) : (
                    <><ShoppingCart className="h-5 w-5" /> Add to Cart</>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative text-center text-xs text-gray-400 before:absolute before:top-1/2 before:left-0 before:w-[38%] before:h-px before:bg-gray-100 after:absolute after:top-1/2 after:right-0 after:w-[38%] after:h-px after:bg-gray-100">
                  {/* or */}
                </div>

                {/* Save to favourites
                <button className="w-full h-11 rounded-[14px] border-[1.5px] border-rose-300/60 text-rose-600 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-rose-50 hover:border-rose-400 transition-colors">
                  <Heart className="h-4 w-4" />
                  Save to Favourites
                </button> */}

                {/* Delivery info */}
                <div className="bg-[#f7f2ec] rounded-xl px-4 py-3 space-y-2 text-[12.5px] text-gray-600">
                  {[
                    { Icon: Clock, text: "Delivery in 30–45 min" },
                    { Icon: Truck, text: "Free delivery over ৳500" },
                    { Icon: ShieldCheck, text: "100% halal certified" },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 opacity-50 shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}