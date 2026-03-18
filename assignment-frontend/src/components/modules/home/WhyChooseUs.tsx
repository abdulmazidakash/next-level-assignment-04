import React from "react";
import Link from "next/link";
import {
  Clock, UtensilsCrossed, ShieldCheck,
  Zap, ArrowRight, CheckCircle2,
} from "lucide-react";

const FEATURES = [
  {
    icon: Clock,
    iconStyle: "bg-orange-500/15 border border-orange-500/25 text-orange-400",
    title: "Lightning Fast Delivery",
    description:
      "Your favourite meals arrive at your door in record time — hot, fresh, and ready to enjoy.",
    stat: "Avg. 30 min delivery",
  },
  {
    icon: UtensilsCrossed,
    iconStyle: "bg-amber-500/15 border border-amber-500/25 text-amber-400",
    title: "Premium Quality Food",
    description:
      "We work only with carefully selected restaurants and the highest-rated local kitchens.",
    stat: "100+ verified restaurants",
  },
  {
    icon: ShieldCheck,
    iconStyle: "bg-green-500/15 border border-green-500/25 text-green-400",
    title: "100% Trusted & Secure",
    description:
      "Safe payments, verified providers, and fully protected personal information — always.",
    stat: "SSL encrypted payments",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-linear-to-b from-[#1a1108] to-[#0f0903] py-16 md:py-24 overflow-hidden">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,107,53,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-275 mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-white/65 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            <Zap className="h-3.5 w-3.5 text-orange-400" />
            Why FoodHub
          </div>

          <h2 className=" text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-white leading-tight mb-3">
            Everything You Need,{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              All in One Place
            </span>
          </h2>

          <p className="text-[15px] text-white/40 max-w-120 mx-auto leading-relaxed">
            We combine speed, quality, and trust so you can enjoy great food without compromise.
          </p>
        </div>

        {/* ── Feature cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, iconStyle, title, description, stat }) => (
            <div
              key={title}
              className="group relative flex flex-col gap-4 bg-white/4 border border-white/8 rounded-4xl p-7 hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-orange-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden"
            >
              {/* Icon tile */}
              <div
                className={`w-13 h-13 rounded-[14px] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconStyle}`}
              >
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </div>

              <h3 className=" text-[1.1rem] font-bold text-white leading-tight">
                {title}
              </h3>

              <p className="text-[13.5px] text-white/45 leading-relaxed flex-1">
                {description}
              </p>

              {/* Stat tag */}
              <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-white/55 text-[11px] font-semibold px-3 py-1.5 rounded-full self-start">
                <CheckCircle2 className="h-3 w-3 text-orange-400" />
                {stat}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA strip ── */}
        <div className="mt-10 bg-white/4 border border-white/[0.07] rounded-4xl px-7 py-6 flex items-center justify-between flex-wrap gap-5">
          <div>
            <h3 className=" text-[1.2rem] font-bold text-white mb-1">
              Ready to order your first meal?
            </h3>
            <p className="text-[13.5px] text-white/40">
              Join thousands of happy customers already using FoodHub
            </p>
          </div>

          <div className="flex gap-2.5 flex-wrap">
            <Link
              href="/meals"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-2xl border-none bg-linear-to-br from-orange-500 to-rose-600 text-white text-[13.5px] font-semibold shadow-md shadow-rose-900/40 hover:shadow-rose-900/60 hover:-translate-y-0.5 transition-all"
            >
              <ArrowRight className="h-4 w-4" />
              Browse Meals
            </Link>
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-2xl border border-white/12 bg-transparent text-white/70 text-[13.5px] font-semibold hover:bg-white/[0.07] hover:text-white hover:border-white/20 transition-all"
            >
              View Providers
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}