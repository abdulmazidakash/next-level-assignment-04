"use client";

import { Quote, Star, MessageSquareHeart } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Rahim Uddin",
    location: "Dhaka, Mirpur",
    avatar: "RU",
    avatarBg: "bg-orange-500/20 text-orange-300",
    rating: 5,
    text: "FoodHub has completely changed how I eat. The delivery is always on time and the food arrives hot. I order almost every day now!",
    meal: "Kacchi Biryani",
  },
  {
    name: "Tasnim Akter",
    location: "Dhaka, Gulshan",
    avatar: "TA",
    avatarBg: "bg-amber-500/20 text-amber-300",
    rating: 5,
    text: "Absolutely love the variety of restaurants available. Found my favourite shawarma place through FoodHub. The app is super easy to use too.",
    meal: "Chicken Shawarma",
  },
  {
    name: "Karim Hossain",
    location: "Dhaka, Dhanmondi",
    avatar: "KH",
    avatarBg: "bg-green-500/20 text-green-300",
    rating: 5,
    text: "Fast delivery, great food, no hassle. Cash on delivery option is a huge plus for me. Highly recommend to anyone in Dhaka!",
    meal: "Beef Burger",
  },
  {
    name: "Sumaiya Islam",
    location: "Dhaka, Uttara",
    avatar: "SI",
    avatarBg: "bg-blue-500/20 text-blue-300",
    rating: 5,
    text: "The tracking feature is amazing. I always know exactly when my food will arrive. Customer support is also very responsive.",
    meal: "Thai Noodles",
  },
  {
    name: "Noor Ahmed",
    location: "Dhaka, Banani",
    avatar: "NA",
    avatarBg: "bg-purple-500/20 text-purple-300",
    rating: 5,
    text: "I've tried many food apps but FoodHub is the best. Prices are fair, delivery is quick, and the food quality is always excellent.",
    meal: "Grilled Chicken",
  },
  {
    name: "Farhan Kabir",
    location: "Dhaka, Rayer Bazar",
    avatar: "FK",
    avatarBg: "bg-rose-500/20 text-rose-300",
    rating: 4,
    text: "Really impressed with how consistent the service is. Every single order has been correct and delivered within the promised time.",
    meal: "Beef Tehari",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-background py-16 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 100%, rgba(255,107,53,0.05) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-black/65 dark:text-white/65 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            <MessageSquareHeart className="h-3.5 w-3.5 text-orange-400" />
            Customer Love
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-black dark:text-white leading-tight mb-3">
            What Our Customers{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="text-[15px] text-black/40 dark:text-white/40 max-w-120 mx-auto leading-relaxed">
            Real reviews from real customers who love ordering with FoodHub
            every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map(
            ({ name, location, avatar, avatarBg, rating, text, meal }) => (
              <div
                key={name}
                className="group relative flex flex-col gap-4 bg-card border border-white/8 rounded-4xl p-6 hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-orange-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                {/* Quote icon */}
                <Quote className="h-5 w-5 text-orange-400/50" />

                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < rating ? "text-orange-400 fill-orange-400" : "text-white/20"}`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-[13.5px] text-black/55 dark:text-white/55 leading-relaxed flex-1 italic">
                  &ldquo;{text}&rdquo;
                </p>

                {/* Meal badge */}
                <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-black/50 dark:text-white/50 text-[11px] font-semibold px-3 py-1.5 rounded-full self-start">
                  🍽 {meal}
                </div>

                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/[0.07]">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${avatarBg}`}
                  >
                    {avatar}
                  </div>
                  <div>
                    <p className="text-[13.5px] font-bold text-black dark:text-white">{name}</p>
                    <p className="text-[11.5px] text-black/35 dark:text-white/35">{location}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}