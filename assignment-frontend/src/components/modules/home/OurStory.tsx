import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function OurStory() {
  return (
    <section className="relative bg-background py-16 md:py-24 overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 50%, rgba(255,107,53,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-8">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-black/65 dark:text-white/65 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full self-start">
              <BookOpen className="h-3.5 w-3.5 text-orange-400" />
              Our Story
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-black dark:text-white leading-tight mb-5">
                The story{" "}
                <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                  behind
                </span>{" "}
                FoodHub.
              </h2>
              <p className="text-[14.5px] text-black/45 dark:text-white/45 leading-relaxed max-w-sm">
                Beyond the platform, FoodHub is known for its compassion and
                dedication to giving back to the community. Through various
                initiatives and partnerships, we continue to make a positive
                impact — joining hands to create a better world, one meal at a
                time.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-2xl bg-linear-to-br from-orange-500 to-rose-600 text-white text-[13.5px] font-semibold shadow-md shadow-rose-900/30 hover:shadow-rose-900/55 hover:-translate-y-0.5 transition-all self-start"
            >
              <ArrowRight className="h-4 w-4" />
              Read Full Story
            </Link>

            {/* Bottom image — dining scene */}
            <div className="relative mt-2 rounded-3xl overflow-hidden aspect-4/3 w-full">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Restaurant dining scene"
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-8 lg:pt-16">
            {/* Top image — chef */}
            <div className="relative rounded-3xl overflow-hidden aspect-4/3 w-full">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
                alt="Chef in kitchen"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Quote block */}
            <div className="relative pl-6 border-l-2 border-orange-500/40">
              {/* Large decorative quote mark */}
              <span className="absolute -top-4 -left-2 text-[5rem] leading-none text-orange-500/15 font-serif select-none">
                &ldquo;
              </span>
              <blockquote className="text-[1.2rem] md:text-[1.35rem] font-semibold text-black/80 dark:text-white/80 leading-snug italic mb-4">
                A story of tradition, innovation, and a genuine love for
                artistry.
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-orange-500/50" />
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-orange-400/70">
                  By Founder
                </span>
              </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { value: "2019", label: "Founded" },
                { value: "11+", label: "Cities soon" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white/4 border border-white/8 rounded-2xl px-5 py-4"
                >
                  <p className="text-[1.6rem] font-bold bg-linear-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
                    {value}
                  </p>
                  <p className="text-[12px] text-black/40 dark:text-white/40 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}