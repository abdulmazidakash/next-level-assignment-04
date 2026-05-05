"use client";

import { useState, useMemo } from "react";
import MealCard from "@/components/modules/meal/MealCard";
import {
  Search, SlidersHorizontal, UtensilsCrossed,
  X, ArrowRight, ChevronDown, ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ── Static filter config ─────────────────────────────────────
const AVAILABILITY_OPTIONS = [
  { label: "All",       value: "all" },
  { label: "Available", value: "available" },
  { label: "Sold Out",  value: "unavailable" },
];

const DIETARY_OPTIONS = [
  { label: "🥩 Halal",       value: "halal" },
  { label: "🌱 Vegetarian",  value: "vegetarian" },
  { label: "🌿 Vegan",       value: "vegan" },
  { label: "🌾 Gluten Free", value: "glutenFree" },
  { label: "🌶️ Spicy",      value: "spicy" },
];

const PRICE_RANGES = [
  { label: "Any Price",   min: 0,   max: Infinity },
  { label: "Under ৳100", min: 0,   max: 100 },
  { label: "৳100–250",   min: 100, max: 250 },
  { label: "৳250–500",   min: 250, max: 500 },
  { label: "৳500+",      min: 500, max: Infinity },
];

// ── Reusable pill button ─────────────────────────────────────
function FilterPill({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-8 px-3.5 rounded-full text-[12.5px] font-semibold border transition-all whitespace-nowrap",
        active
          ? "bg-linear-to-br from-orange-500 to-rose-600 text-white border-transparent shadow-sm shadow-rose-200"
          : "bg-white border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-600 hover:bg-amber-50"
      )}
    >
      {children}
    </button>
  );
}

interface MealsFilterProps {
  meals: any[];
}

export default function MealsFilter({ meals }: MealsFilterProps) {
  const [query, setQuery]             = useState("");
  const [availability, setAvail]      = useState("all");
  const [selectedCategory, setCat]    = useState("all");
  const [selectedCuisine, setCuisine] = useState("all");
  const [dietary, setDietary]         = useState<string[]>([]);
  const [priceRange, setPriceRange]   = useState(0); // index into PRICE_RANGES
  const [showAdvanced, setShowAdv]    = useState(false);

  // ── Derive unique categories & cuisines from data ────────
  const categories = useMemo(() => {
    const cats = meals.map((m) => m.category?.name).filter(Boolean) as string[];
    return ["all", ...Array.from(new Set(cats))];
  }, [meals]);

  const cuisines = useMemo(() => {
    const cs = meals.map((m) => m.provider?.cuisineType).filter(Boolean) as string[];
    return ["all", ...Array.from(new Set(cs))];
  }, [meals]);

  // ── Filter logic ─────────────────────────────────────────
  const filtered = useMemo(() => {
    const { min, max } = PRICE_RANGES[priceRange];
    return meals.filter((meal) => {
      // Search
      const q = query.toLowerCase().trim();
      const matchesQuery = !q ||
        meal.name?.toLowerCase().includes(q) ||
        meal.description?.toLowerCase().includes(q) ||
        meal.provider?.restaurantName?.toLowerCase().includes(q) ||
        meal.provider?.cuisineType?.toLowerCase().includes(q);

      // Availability
      const matchesAvail =
        availability === "all" ||
        (availability === "available" && meal.isAvailable !== false) ||
        (availability === "unavailable" && meal.isAvailable === false);

      // Category
      const matchesCat =
        selectedCategory === "all" || meal.category?.name === selectedCategory;

      // Cuisine
      const matchesCuisine =
        selectedCuisine === "all" || meal.provider?.cuisineType === selectedCuisine;

      // Price
      const price = meal.price ?? 0;
      const matchesPrice = price >= min && price <= max;

      // Dietary — check meal.tags array first, then keyword fallback
      const tags: string[] = meal.tags ?? [];
      const nameDesc = `${meal.name ?? ""} ${meal.description ?? ""}`.toLowerCase();
      const keywordMap: Record<string, string[]> = {
        halal:       ["halal"],
        vegetarian:  ["vegetarian", "veg"],
        vegan:       ["vegan", "plant-based"],
        glutenFree:  ["gluten free", "gluten-free"],
        spicy:       ["spicy", "hot", "chilli", "chili"],
      };
      const matchesDietary = dietary.every((pref) =>
        tags.includes(pref) ||
        (keywordMap[pref] ?? []).some((kw) => nameDesc.includes(kw))
      );

      return matchesQuery && matchesAvail && matchesCat && matchesCuisine && matchesPrice && matchesDietary;
    });
  }, [meals, query, availability, selectedCategory, selectedCuisine, priceRange, dietary]);

  const toggleDietary = (pref: string) =>
    setDietary((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );

  // Count active filters for the badge
  const activeFilterCount = [
    query ? 1 : 0,
    availability !== "all" ? 1 : 0,
    selectedCategory !== "all" ? 1 : 0,
    selectedCuisine !== "all" ? 1 : 0,
    priceRange !== 0 ? 1 : 0,
    dietary.length,
  ].reduce((a, b) => a + b, 0);

  const hasFilters = activeFilterCount > 0;

  const clearFilters = () => {
    setQuery(""); setAvail("all"); setCat("all");
    setCuisine("all"); setPriceRange(0); setDietary([]);
  };

  return (
    <>
      {/* ── Row 1: Search + availability + filter toggle ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search meals, restaurants, cuisines…"
            className="w-full h-11 pl-10 pr-10 rounded-2xl border border-gray-200 bg-input text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-400 transition-colors"
          />
          {query && (
            <button onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <X className="h-3 w-3 text-gray-500" />
            </button>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-2xl px-2 h-11 shrink-0">
          {AVAILABILITY_OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => setAvail(opt.value)}
              className={cn(
                "h-7 px-3 rounded-xl text-[12.5px] font-semibold transition-all whitespace-nowrap",
                availability === opt.value
                  ? "bg-linear-to-br from-orange-500 to-rose-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              )}>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Advanced filter toggle */}
        <button
          onClick={() => setShowAdv((v) => !v)}
          className={cn(
            "h-11 px-4 rounded-2xl border text-[13px] font-semibold flex items-center gap-2 transition-all shrink-0",
            showAdvanced
              ? "bg-amber-50 border-amber-300 text-amber-800"
              : "bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-amber-50 hover:text-orange-600"
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-4.5 h-4.5 rounded-full bg-linear-to-br from-orange-500 to-rose-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
              {activeFilterCount}
            </span>
          )}
          {showAdvanced
            ? <ChevronUp className="h-3.5 w-3.5 ml-auto" />
            : <ChevronDown className="h-3.5 w-3.5 ml-auto" />}
        </button>
      </div>

      {/* ── Advanced filter panel ── */}
      {showAdvanced && (
        <div className="bg-white border border-black/[0.07] rounded-[18px] p-5 mb-5 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Category */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.07em] uppercase text-gray-400 mb-2.5">
                Category
              </p>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <FilterPill key={cat} active={selectedCategory === cat} onClick={() => setCat(cat)}>
                    {cat === "all" ? "All" : cat}
                  </FilterPill>
                ))}
              </div>
            </div>

            {/* Cuisine — only show if more than 1 unique cuisine */}
            {cuisines.length > 2 && (
              <div>
                <p className="text-[11px] font-bold tracking-[0.07em] uppercase text-gray-400 mb-2.5">
                  Cuisine
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cuisines.map((c) => (
                    <FilterPill key={c} active={selectedCuisine === c} onClick={() => setCuisine(c)}>
                      {c === "all" ? "All" : c}
                    </FilterPill>
                  ))}
                </div>
              </div>
            )}

            {/* Price range */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.07em] uppercase text-gray-400 mb-2.5">
                Price Range
              </p>
              <div className="flex flex-wrap gap-1.5">
                {PRICE_RANGES.map((range, idx) => (
                  <FilterPill key={idx} active={priceRange === idx} onClick={() => setPriceRange(idx)}>
                    {range.label}
                  </FilterPill>
                ))}
              </div>
            </div>
          </div>

          {/* Dietary preferences — full width */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[11px] font-bold tracking-[0.07em] uppercase text-gray-400 mb-2.5">
              Dietary Preferences
            </p>
            <div className="flex flex-wrap gap-1.5">
              {DIETARY_OPTIONS.map((opt) => (
                <FilterPill
                  key={opt.value}
                  active={dietary.includes(opt.value)}
                  onClick={() => toggleDietary(opt.value)}
                >
                  {opt.label}
                </FilterPill>
              ))}
            </div>
            <p className="text-[11.5px] text-gray-400 mt-2">
              Based on meal tags and descriptions. Multiple selections = must match all.
            </p>
          </div>

          {/* Clear all */}
          {hasFilters && (
            <div className="flex justify-end border-t border-gray-100 pt-3">
              <button onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-gray-400 hover:text-red-500 transition-colors">
                <X className="h-3.5 w-3.5" />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Category quick-chips (visible when panel is closed) ── */}
      {!showAdvanced && categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <FilterPill key={cat} active={selectedCategory === cat} onClick={() => setCat(cat)}>
              {cat === "all" ? "All Categories" : cat}
            </FilterPill>
          ))}
          {hasFilters && (
            <button onClick={clearFilters}
              className="h-8 px-3 rounded-full text-[12px] font-semibold border border-dashed border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center gap-1.5">
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>
      )}

      {/* ── Results summary ── */}
      {hasFilters && (
        <p className="text-[13px] text-gray-400 mb-5">
          {filtered.length === 0
            ? "No results match your filters"
            : `Showing ${filtered.length} of ${meals.length} meal${meals.length !== 1 ? "s" : ""}`}
        </p>
      )}

      {/* ── Meal grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((meal: any) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-black/[0.07] rounded-2xl flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
            <UtensilsCrossed className="h-7 w-7 text-amber-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {hasFilters ? "No meals match your filters" : "No meals available"}
          </h2>
          <p className="text-[13.5px] text-gray-400 max-w-xs leading-relaxed">
            {hasFilters
              ? "Try adjusting your search or removing some filters."
              : "Check back soon — the kitchen is being stocked with delicious options."}
          </p>
          {hasFilters ? (
            <button onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-2 h-10 px-5 rounded-2xl border border-orange-300 text-orange-600 text-[13.5px] font-semibold hover:bg-amber-50 transition-all">
              <X className="h-4 w-4" />
              Clear all filters
            </button>
          ) : (
            <Link href="/providers"
              className="mt-5 inline-flex items-center gap-2 h-10 px-5 rounded-2xl bg-linear-to-br from-orange-500 to-rose-600 text-white text-[13.5px] font-semibold shadow-md shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all">
              Browse Providers
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
    </>
  );
}