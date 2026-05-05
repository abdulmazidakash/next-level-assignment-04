"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Store, Star } from "lucide-react";

const STATS = [
  {
    icon: Users,
    iconStyle: "bg-orange-500/15 border border-orange-500/25 text-orange-400",
    value: 50000,
    suffix: "+",
    label: "Happy Customers",
    description: "Served across Bangladesh",
  },
  {
    icon: Store,
    iconStyle: "bg-amber-500/15 border border-amber-500/25 text-amber-400",
    value: 100,
    suffix: "+",
    label: "Partner Restaurants",
    description: "Verified & top-rated kitchens",
  },
  {
    icon: TrendingUp,
    iconStyle: "bg-green-500/15 border border-green-500/25 text-green-400",
    value: 500000,
    suffix: "+",
    label: "Orders Delivered",
    description: "Hot, fresh & on time",
  },
  {
    icon: Star,
    iconStyle: "bg-blue-500/15 border border-blue-500/25 text-blue-400",
    value: 4.9,
    suffix: "★",
    label: "Average Rating",
    description: "From verified customers",
    isDecimal: true,
  },
];

function useCountUp(target: number, isDecimal: boolean, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, isDecimal, started]);

  return isDecimal ? count.toFixed(1) : count.toLocaleString();
}

function StatCard({
  icon: Icon,
  iconStyle,
  value,
  suffix,
  label,
  description,
  isDecimal = false,
  started,
}: (typeof STATS)[0] & { started: boolean }) {
  const display = useCountUp(value, !!isDecimal, started);

  return (
    <div className="group relative flex flex-col items-center text-center gap-3 bg-white/4 border border-white/8 rounded-4xl p-7 hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-orange-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
      <div
        className={`w-13 h-13 rounded-[14px] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconStyle}`}
      >
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>
      <div className="text-[2.4rem] font-bold bg-linear-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent leading-none tabular-nums">
        {display}
        {suffix}
      </div>
      <div>
        <p className="text-[1rem] font-bold text-white">{label}</p>
        <p className="text-[12.5px] text-white/40 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

export default function Statistics() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-linear-to-b from-[#0f0903] to-[#1a1108] py-16 md:py-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(255,107,53,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(225,29,72,0.06) 0%, transparent 50%)",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-white/65 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            <TrendingUp className="h-3.5 w-3.5 text-orange-400" />
            Our Numbers
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-white leading-tight mb-3">
            Trusted by Thousands{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Every Day
            </span>
          </h2>
          <p className="text-[15px] text-white/40 max-w-120 mx-auto leading-relaxed">
            Numbers that reflect the trust and love of our growing community
            across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}