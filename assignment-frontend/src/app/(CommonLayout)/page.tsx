/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroCarousel from "@/components/modules/home/Hero";
import TopRatedProviders from "@/components/modules/home/TopRatedProviders";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import HowItWorks from "@/components/modules/home/HowItWorks";
import FeaturedMeals from "@/components/modules/home/FeaturedMeals";

export default async function Home() {


  return (
    <div className="">

      {/* ── Hero ── */}
      <HeroCarousel />

      {/* ── Featured Meals ── */}
      <FeaturedMeals />

      {/* ── Top Rated Providers ── */}
      <TopRatedProviders />

      {/* ── Why Choose Us ── */}
      <WhyChooseUs />

      <HowItWorks />

    </div>
  );
}