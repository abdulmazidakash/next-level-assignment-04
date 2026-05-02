"use client"

import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400&q=85",
    tag: "Burgers",
    title: "Gourmet Burgers,\nDelivered Fresh",
    description: "Juicy, premium-ingredient burgers made to order and delivered hot to your door.",
    cta: "Order Burgers",
    accent: "from-orange-500 to-rose-600",
  },
  {
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=1400&q=85",
    tag: "Asian",
    title: "Bold Asian\nFlavours",
    description: "Explore spicy noodles, fresh seafood, and authentic recipes from across Asia.",
    cta: "Explore Asian",
    accent: "from-teal-500 to-emerald-600",
  },
  {
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1400&q=85",
    tag: "Biryani",
    title: "Legendary\nKacchi Biryani",
    description: "Slow-cooked, saffron-layered, and rich with tradition. Order the real thing today.",
    cta: "Order Biryani",
    accent: "from-amber-500 to-orange-600",
  },
]

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    onSelect()
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi])

  return (
    <div className="relative container  py-4 ">
      <div className="container mx-auto relative ">

        {/* ── Carousel viewport ── */}
        <div className="overflow-hidden rounded-[24px] shadow-[0_16px_48px_rgba(0,0,0,0.18)] h-[65vh] md:h-[90vh] lg:h-[90vh]" ref={emblaRef}>
          <div className="flex touch-pan-y w-full">
            {SLIDES.map((slide, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 relative h-105 sm:h-125 md:h-140">

                {/* Background image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(max-width: 1100px) 100vw, 1100px"
                />

                {/* linear overlay — richer than plain black */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Content — left-aligned */}
                <div className="absolute inset-0 flex flex-col justify-end pb-14 px-8 sm:px-12 md:px-16 max-w-170">

                  {/* Cuisine tag */}
                  <div className={cn(
                    "inline-flex items-center gap-2 self-start bg-linear-to-r text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full mb-4 shadow-md",
                    slide.accent
                  )}>
                    <UtensilsCrossed className="h-3 w-3" />
                    {slide.tag}
                  </div>

                  {/* Title */}
                  <h2 className=" text-[clamp(1.8rem,5vw,3.2rem)] font-bold text-white leading-tight mb-3 drop-shadow-lg whitespace-pre-line">
                    {slide.title}
                  </h2>

                  {/* Description */}
                  <p className="text-[14.5px] sm:text-[15.5px] text-white/75 leading-relaxed mb-7 max-w-120">
                    {slide.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link
                      href="/meals"
                      className={cn(
                        "inline-flex items-center gap-2 h-12 px-6 rounded-[14px]",
                        "bg-linear-to-br text-white text-[14.5px] font-semibold",
                        "shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all",
                        slide.accent
                      )}
                    >
                      {slide.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/providers"
                      className="inline-flex items-center gap-2 h-12 px-6 rounded-[14px] border border-white/30 bg-white/10 backdrop-blur-sm text-white text-[14.5px] font-semibold hover:bg-white/20 hover:border-white/50 transition-all"
                    >
                      Browse Providers
                    </Link>
                  </div>
                </div>

                {/* Slide counter */}
                <div className="absolute top-5 right-6 bg-black/40 backdrop-blur-sm border border-white/20 text-white text-[12px] font-semibold px-3 py-1 rounded-full">
                  {i + 1} / {SLIDES.length}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Prev / Next ── */}
        <button
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={scrollNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* ── Dot indicators ── */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "rounded-full transition-all duration-300",
                selectedIndex === i
                  ? "w-6 h-2.5 bg-white shadow-md"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>

      </div>
    </div>
  )
}