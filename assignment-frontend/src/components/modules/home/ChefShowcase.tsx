import Link from "next/link";
import { ChefHat, ArrowRight } from "lucide-react";

const AVATARS = [
  { initials: "AK", bg: "bg-orange-400" },
  { initials: "SR", bg: "bg-amber-500" },
  { initials: "MH", bg: "bg-green-500" },
];

export default function ChefShowcase() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* ── Full-width background image ── */}
      <div className="relative w-full h-[520px] md:h-[620px]">
        {/* Replace src with your actual chef/food image */}
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80"
          alt="Chef preparing a dish"
          className="w-full h-full object-cover object-center"
        />

        {/* Subtle dark overlay on left side for breathing room */}
        <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#0f0903] to-transparent pointer-events-none" />

        {/* ── Floating Card ── */}
        <div className="absolute bottom-10 right-6 md:right-16 lg:right-24 w-[88vw] max-w-[380px] bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.22)] p-7 md:p-8">

          {/* Tag */}
          <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-600 text-[10.5px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
            <ChefHat className="h-3 w-3" />
            Our Chefs
          </div>

          {/* Heading */}
          <h2 className="text-[1.55rem] md:text-[1.75rem] font-bold text-gray-900 leading-snug mb-3">
            The flavor of magicians{" "}
            <span className="text-orange-500">with every dish.</span>
          </h2>

          {/* Description */}
          <p className="text-[13.5px] text-gray-500 leading-relaxed mb-6">
            We are culinary artisans on a mission to create the most
            extraordinary dining experiences for our guests.
          </p>

          {/* Avatars + CTA row */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Stacked avatars */}
            <div className="flex items-center">
              {AVATARS.map(({ initials, bg }, i) => (
                <div
                  key={initials}
                  className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold text-white shrink-0 ${bg}`}
                  style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: AVATARS.length - i }}
                >
                  {initials}
                </div>
              ))}
              {/* +N badge */}
              <div
                className="w-9 h-9 rounded-full border-2 border-white bg-gray-800 flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                style={{ marginLeft: "-10px" }}
              >
                +8
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-orange-500 text-white text-[13px] font-semibold hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200 transition-all"
            >
              Meet the Chefs
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}