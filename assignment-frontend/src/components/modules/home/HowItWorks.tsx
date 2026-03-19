import React from "react";
import Link from "next/link";
import {
  Zap, MapPin, UtensilsCrossed, CreditCard,
  Clock, CheckCircle2, ArrowRight,
} from "lucide-react";

const STEPS = [
  {
    number: "1",
    icon: MapPin,
    title: "Browse Nearby Restaurants",
    description:
      "Explore hundreds of top-rated local restaurants and cuisines right in your city.",
    stat: "Free to browse",
    iconStyle: "text-orange-400",
    bgStyle: "bg-orange-500/[0.08] border border-orange-500/20",
  },
  {
    number: "2",
    icon: UtensilsCrossed,
    title: "Pick Your Favourite Meals",
    description:
      "Add meals to your cart, adjust quantities, and customise your order exactly how you like it.",
    stat: "Easy customisation",
    iconStyle: "text-amber-400",
    bgStyle: "bg-amber-500/[0.08] border border-amber-500/20",
  },
  {
    number: "3",
    icon: CreditCard,
    title: "Checkout Securely",
    description:
      "Enter your delivery address and pay safely. Cash on delivery available for all orders.",
    stat: "SSL secured",
    iconStyle: "text-green-400",
    bgStyle: "bg-green-500/[0.08] border border-green-500/20",
  },
  {
    number: "4",
    icon: Clock,
    title: "Enjoy Hot Delivery",
    description:
      "Sit back and relax. Your meal arrives hot, fresh, and right on time — every single order.",
    stat: "Avg. 30 min",
    iconStyle: "text-blue-400",
    bgStyle: "bg-blue-500/[0.08] border border-blue-500/20",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-275 mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            <Zap className="h-3.5 w-3.5" />
            How It Works
          </div>

          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-900 leading-tight mb-3">
            Order in{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              4 Simple Steps
            </span>
          </h2>

          <p className="text-[15px] text-gray-400 max-w-120 mx-auto leading-relaxed">
            From hunger to doorstep in minutes — here's how FoodHub makes it effortless.
          </p>
        </div>

        {/* ── Steps ── */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-13 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px"
            style={{ background: "linear-linear(to right, #ff6b35, #e8384f, #ff6b35)", opacity: 0.2 }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {STEPS.map(({ number, icon: Icon, title, description, stat, iconStyle, bgStyle }, i) => (
              <div
                key={number}
                className="relative group bg-white border border-black/[0.07] rounded-4xl p-6 flex flex-col gap-4 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.09)] hover:border-orange-200/60 transition-all duration-300"
              >
                {/* Step number + icon */}
                <div className="flex items-center gap-3">
                  {/* linear number tile */}
                  <div className="w-13 h-13 rounded-[14px] bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0 shadow-md shadow-rose-200 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300">
                    <span className=" text-[1.3rem] font-bold text-white">
                      {number}
                    </span>
                  </div>

                  {/* Decorative step icon */}
                  <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${bgStyle}`}>
                    <Icon className={`h-4.5 w-4.5 ${iconStyle}`} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Arrow connector — desktop */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-2.75 top-11.5 z-10 text-orange-300 text-xl font-bold leading-none">
                    ›
                  </div>
                )}

                <h3 className=" text-[1rem] font-bold text-gray-900 leading-snug">
                  {title}
                </h3>

                <p className="text-[13.5px] text-gray-400 leading-relaxed flex-1">
                  {description}
                </p>

                {/* Stat tag */}
                <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold px-3 py-1.5 rounded-full self-start">
                  <CheckCircle2 className="h-3 w-3 text-amber-600" />
                  {stat}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 text-center">
          <Link
            href="/meals"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-[14px] bg-linear-to-br from-orange-500 to-rose-600 text-white text-[15px] font-semibold shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all"
          >
            Start Ordering Now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-[12.5px] text-gray-400 mt-3">
            No account required to browse · Sign up in 30 seconds
          </p>
        </div>

      </div>
    </section>
  );
}