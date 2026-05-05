/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroCarousel from "@/components/modules/home/Hero";
import TopRatedProviders from "@/components/modules/home/TopRatedProviders";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import HowItWorks from "@/components/modules/home/HowItWorks";
import FeaturedMeals from "@/components/modules/home/FeaturedMeals";
import PopularCategories from "@/components/modules/home/PopularCategories";
import Statistics from "@/components/modules/home/Statistics";
import Testimonials from "@/components/modules/home/Testimonials";
import Newsletter from "@/components/modules/home/NewsLetter";
import FAQ from "@/components/modules/home/Faq";
import SpecialOffers from "@/components/modules/home/SpecialOffers";
import ChefShowcase from "@/components/modules/home/ChefShowcase";
import OurStory from "@/components/modules/home/OurStory";


export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <HeroCarousel />

      {/* ── Popular Categories ── */}
      {/* <PopularCategories /> */}

      {/* ── Featured Meals ── */}
      <FeaturedMeals />

      {/* ── Statistics ── */}
      {/* <Statistics /> */}

      {/* ── Top Rated Providers ── */}
      <TopRatedProviders />

      {/* ── Why Choose Us ── */}
      <WhyChooseUs />

      <OurStory/>

      {/* ── How It Works ── */}
      {/* <HowItWorks /> */}

      {/* ── Testimonials ── */}
      <Testimonials />

      <SpecialOffers/>

      {/* ── Newsletter ── */}
      <Newsletter />

      {/* ── FAQ ── */}
      <FAQ />

    </div>
  );
}