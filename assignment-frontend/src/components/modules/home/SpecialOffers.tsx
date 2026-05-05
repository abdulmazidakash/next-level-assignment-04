"use client";

import Link from "next/link";
import { Tag, Clock, Flame, ArrowRight, Zap } from "lucide-react";

const OFFERS = [
  {
    badge: "🔥 Hot Deal",
    badgeStyle: "bg-orange-500/15 border-orange-500/30 text-orange-300",
    title: "50% Off Your First Order",
    description:
      "New to FoodHub? Enjoy half off on your very first order. No minimum spend required.",
    code: "FIRST50",
    expiry: "Ends in 2 days",
    expiryStyle: "text-orange-400",
    cta: "Claim Offer",
    href: "/meals",
    glow: "hover:shadow-[0_20px_48px_rgba(249,115,22,0.15)]",
    accent: "hover:border-orange-500/40",
  },
  {
    badge: "⚡ Flash Sale",
    badgeStyle: "bg-amber-500/15 border-amber-500/30 text-amber-300",
    title: "Free Delivery All Weekend",
    description:
      "Order anything from any restaurant this weekend and get completely free delivery.",
    code: "FREEDEL",
    expiry: "Ends Sunday midnight",
    expiryStyle: "text-amber-400",
    cta: "Order Now",
    href: "/meals",
    glow: "hover:shadow-[0_20px_48px_rgba(245,158,11,0.12)]",
    accent: "hover:border-amber-500/40",
  },
  {
    badge: "🎁 Bundle Deal",
    badgeStyle: "bg-green-500/15 border-green-500/30 text-green-300",
    title: "Spend ৳500, Save ৳100",
    description:
      "Order ৳500 or more from any partner restaurant and automatically save ৳100 at checkout.",
    code: "SAVE100",
    expiry: "Limited time offer",
    expiryStyle: "text-green-400",
    cta: "Browse Meals",
    href: "/meals",
    glow: "hover:shadow-[0_20px_48px_rgba(34,197,94,0.10)]",
    accent: "hover:border-green-500/40",
  },
];

const TICKER_OFFERS = [
  "🔥 FIRST50 — 50% off your first order",
  "⚡ FREEDEL — Free delivery all weekend",
  "🎁 SAVE100 — Spend ৳500, save ৳100",
  "🍔 BURGER20 — 20% off all burgers today",
  "🍕 PIZZA15 — 15% off pizza orders above ৳300",
];

export default function SpecialOffers() {
  return (
    <section className="relative bg-background py-16 md:py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(255,107,53,0.07) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-black/65 dark:text-white/65 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            <Tag className="h-3.5 w-3.5 text-orange-400" />
            Limited Time
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-black dark:text-white leading-tight mb-3">
            Hot Deals &{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Special Offers
            </span>
          </h2>
          <p className="text-[15px] text-black/40 dark:text-white/40 max-w-120 mx-auto leading-relaxed">
            Don&apos;t miss out — grab these exclusive deals before they expire.
            New offers added every week.
          </p>
        </div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {OFFERS.map(
            ({
              badge,
              badgeStyle,
              title,
              description,
              code,
              expiry,
              expiryStyle,
              cta,
              href,
              glow,
              accent,
            }) => (
              <div
                key={title}
                className={`group relative flex flex-col gap-4 bg-card border border-white/8 rounded-4xl p-7 hover:-translate-y-1.5 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden ${glow} ${accent}`}
              >
                {/* Decorative corner shape */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/[0.03] pointer-events-none" />

                {/* Badge */}
                <span
                  className={`inline-flex items-center self-start text-[11px] font-bold px-3 py-1.5 rounded-full border ${badgeStyle}`}
                >
                  {badge}
                </span>

                {/* Title & description */}
                <h3 className="text-[1.1rem] font-bold text-black dark:text-white leading-snug">
                  {title}
                </h3>
                <p className="text-[13.5px] text-black/45 dark:text-white/45 leading-relaxed flex-1">
                  {description}
                </p>

                {/* Promo code */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-black/35 dark:text-white/35 font-semibold uppercase tracking-wider">
                    Code:
                  </span>
                  <span className="font-mono text-[12.5px] font-bold text-black dark:text-white bg-white/8 dark:bg-white/8 border border-white/12 dark:border-white/12 px-3 py-1 rounded-lg tracking-widest">
                    {code}
                  </span>
                </div>

                {/* Expiry */}
                <div className={`flex items-center gap-1.5 text-[11.5px] font-semibold ${expiryStyle}`}>
                  <Clock className="h-3 w-3" />
                  {expiry}
                </div>

                {/* CTA */}
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 h-10 px-5 rounded-2xl bg-linear-to-br from-orange-500 to-rose-600 text-white text-[13px] font-semibold shadow-md shadow-rose-900/30 hover:shadow-rose-900/50 hover:-translate-y-0.5 transition-all self-start"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  {cta}
                </Link>
              </div>
            )
          )}
        </div>

        {/* Scrolling ticker */}
        <div className="relative overflow-hidden bg-card border border-white/8 rounded-2xl py-3 px-0">
          <div className="flex gap-12 animate-[ticker_18s_linear_infinite] whitespace-nowrap">
            {[...TICKER_OFFERS, ...TICKER_OFFERS].map((offer, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-black/50 dark:text-white/50 shrink-0"
              >
                <Flame className="h-3 w-3 text-orange-400 shrink-0" />
                {offer}
              </span>
            ))}
          </div>
        </div>

        {/* View all deals CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/meals"
            className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <Zap className="h-4 w-4" />
            View all current deals
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Ticker keyframe */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}