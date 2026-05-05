import React from "react";
import { ChefHat, Leaf, Heart, Clock, Star, Users } from "lucide-react";

const stats = [
  { icon: Clock, value: "5+", label: "Years Serving" },
  { icon: Users, value: "12k+", label: "Happy Customers" },
  { icon: ChefHat, value: "80+", label: "Menu Items" },
  { icon: Star, value: "4.9", label: "Avg. Rating" },
];

const values = [
  {
    icon: ChefHat,
    title: "Crafted with Mastery",
    description:
      "Every dish is prepared by seasoned chefs who treat cooking as an art — not a process. We source authentic recipes passed down through generations.",
  },
  {
    icon: Leaf,
    title: "Farm-Fresh Ingredients",
    description:
      "We partner with local farmers to bring the freshest, seasonal produce to your plate. No preservatives. No shortcuts. Just honest food.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "We believe food should feel like home. Every meal we serve carries warmth, care, and the intention to make your day a little better.",
  },
];

const team = [
  { name: "Rafiq Hossain", role: "Head Chef", initials: "RH", color: "bg-orange-100 text-orange-600" },
  { name: "Nadia Islam", role: "Pastry Chef", initials: "NI", color: "bg-red-100 text-red-600" },
  { name: "Arif Uddin", role: "Kitchen Manager", initials: "AU", color: "bg-amber-100 text-amber-600" },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen rounded-2xl bg-[#fdf8f3] text-gray-900 dark:bg-gray-900 dark:text-white">

      {/* ── Google Font import ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rise { animation: rise 0.6s ease-out both; }
        .rise-1 { animation-delay: 0.05s; }
        .rise-2 { animation-delay: 0.15s; }
        .rise-3 { animation-delay: 0.25s; }
        .rise-4 { animation-delay: 0.35s; }

        .divider-spice {
          background: linear-linear(to right, #f97316, #fb923c, #fcd34d, transparent);
          height: 2px;
          border: none;
        }
      `}</style>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 sm:px-12 lg:px-20">
        {/* Background blob */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-120 h-120 rounded-full bg-orange-100/60 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-16 w-75 h-75 rounded-full bg-red-50/70 blur-2xl" />

        <div className="relative max-w-4xl mx-auto">
          <p className="font-body rise rise-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-500 mb-5">
            <span className="w-6 h-px bg-orange-400 inline-block" />
            Our Story
          </p>

          <h1 className="font-display rise rise-2 text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] text-gray-900 dark:text-white mb-6">
            Food made{" "}
            <em className="not-italic text-orange-500">from the</em>
            <br />
            heart of Dhaka
          </h1>

          <p className="font-body rise rise-3 text-lg text-gray-500 font-light max-w-xl leading-relaxed mb-10">
            We started as a small kitchen with a big dream — to bring restaurant-quality meals
            to every table in the city, without compromise on taste, freshness, or love.
          </p>

          <hr className="divider-spice rise rise-4 w-40" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS RIBBON
      ══════════════════════════════════════ */}
      <section className="bg-background border-y border-orange-100 px-6 py-10 sm:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Icon className="h-4.5 w-4.5 text-orange-500 " />
              </div>
              <p className="font-display text-3xl font-black text-gray-900 dark:text-white">{value}</p>
              <p className="font-body text-xs text-gray-400 dark:text-white font-medium uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSION SPLIT
      ══════════════════════════════════════ */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual block */}
          <div className="relative">
            <div className="w-full aspect-4/3 rounded-3xl bg-linear-to-br from-orange-200 via-amber-100 to-red-100 flex items-center justify-center overflow-hidden shadow-xl">
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-linear(circle at 20% 80%, #f97316 0%, transparent 50%),
                                    radial-linear(circle at 80% 20%, #ef4444 0%, transparent 50%)`
                }}
              />
              <ChefHat className="h-24 w-24 text-orange-400/60" strokeWidth={1} />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 border border-orange-50">
              <span className="text-2xl">🍛</span>
              <div>
                <p className="font-display text-sm font-bold text-gray-800">Since 2019</p>
                <p className="font-body text-xs text-gray-400">Serving Dhaka</p>
              </div>
            </div>
          </div>

          {/* Text block */}
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">
              Who We Are
            </p>
            <h2 className="font-display text-4xl font-black text-gray-900 dark:text-white leading-tight mb-5">
              A kitchen built on tradition & trust
            </h2>
            <p className="font-body text-gray-500 dark:text-white font-light leading-relaxed mb-4">
              NourishBox began in a humble Chittagong kitchen where our founder, inspired by his
              grandmother's recipes, decided the world needed more honest, soulful cooking. What
              started as weekend deliveries to neighbors quickly grew into a beloved city-wide brand.
            </p>
            <p className="font-body text-gray-500 dark:text-white font-light leading-relaxed">
              Today we serve thousands of families daily — but our kitchen philosophy hasn't changed
              one bit. Every meal is cooked fresh, plated with care, and delivered with pride.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VALUES
      ══════════════════════════════════════ */}
      <section className="bg-background px-6 py-20 sm:px-12 lg:px-20 border-t border-orange-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">
              What Drives Us
            </p>
            <h2 className="font-display text-4xl font-black text-gray-900 dark:text-white">Our core values</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl border border-orange-100 bg-[#fdf8f3] dark:bg-[#1f2937] hover:border-orange-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                  <Icon className="h-5 w-5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="font-body text-sm text-gray-500 dark:text-white font-light leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TEAM
      ══════════════════════════════════════ */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">
                The People
              </p>
              <h2 className="font-display text-4xl font-black text-gray-900 dark:text-white">Meet the team</h2>
            </div>
            <p className="font-body text-sm text-gray-400 dark:text-white sm:mb-1">The hands behind your meals</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {team.map(({ name, role, initials, color }) => (
              <div
                key={name}
                className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center font-display font-black text-lg shrink-0`}>
                  {initials}
                </div>
                <div>
                  <p className="font-display font-bold text-gray-900 dark:text-white">{name}</p>
                  <p className="font-body text-xs text-gray-400 dark:text-white font-medium">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="px-6 pb-24 sm:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-orange-500 to-red-500 px-10 py-14 text-center shadow-2xl">
            {/* decorative circles */}
            <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-8 -right-8 w-56 h-56 rounded-full bg-white/10" />

            <p className="font-body text-orange-100 text-sm font-semibold uppercase tracking-widest mb-3">
              Hungry yet?
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
              Taste the difference today
            </h2>
            <p className="font-body text-orange-100 font-light text-base max-w-sm mx-auto mb-8">
              Order your first meal and discover why thousands of families trust us every single day.
            </p>
            <a
              href="/meals"
              className="font-body inline-block bg-white text-orange-600 font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Browse Our Menu →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}