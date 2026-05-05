import Link from "next/link";
import { LayoutGrid } from "lucide-react";

const CATEGORIES = [
  { emoji: "🍛", name: "Biryani", count: "48 restaurants", bg: "bg-orange-500/10 border-orange-500/20 hover:border-orange-500/50" },
  { emoji: "🍔", name: "Burgers", count: "35 restaurants", bg: "bg-amber-500/10 border-amber-500/20 hover:border-amber-500/50" },
  { emoji: "🍕", name: "Pizza", count: "27 restaurants", bg: "bg-yellow-500/10 border-yellow-500/20 hover:border-yellow-500/50" },
  { emoji: "🍜", name: "Noodles", count: "31 restaurants", bg: "bg-green-500/10 border-green-500/20 hover:border-green-500/50" },
  { emoji: "🥗", name: "Salads", count: "19 restaurants", bg: "bg-teal-500/10 border-teal-500/20 hover:border-teal-500/50" },
  { emoji: "🍣", name: "Sushi", count: "14 restaurants", bg: "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50" },
  { emoji: "🥙", name: "Shawarma", count: "22 restaurants", bg: "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50" },
  { emoji: "🍰", name: "Desserts", count: "40 restaurants", bg: "bg-rose-500/10 border-rose-500/20 hover:border-rose-500/50" },
];

export default function PopularCategories() {
  return (
    <section className="relative bg-linear-to-b from-[#0f0903] to-[#1a1108] py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 max-w-275 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-white/65 text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            <LayoutGrid className="h-3.5 w-3.5 text-orange-400" />
            Browse by Category
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-white leading-tight mb-3">
            What Are You{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
              Craving Today?
            </span>
          </h2>
          <p className="text-[15px] text-white/40 max-w-120 mx-auto leading-relaxed">
            Explore your favourite food categories and discover the best
            restaurants in your area.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map(({ emoji, name, count, bg }) => (
            <Link
              key={name}
              href={`/meals?category=${name.toLowerCase()}`}
              className={`group flex flex-col items-center gap-3 border rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.3)] ${bg}`}
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {emoji}
              </span>
              <div className="text-center">
                <p className="text-[13px] font-bold text-white">{name}</p>
                <p className="text-[10.5px] text-white/35 mt-0.5">{count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}