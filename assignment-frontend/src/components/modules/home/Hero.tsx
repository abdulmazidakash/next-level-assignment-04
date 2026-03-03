"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function HeroCarousel() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      title: "Delicious Gourmet Burgers",
      description:
        "Juicy, fresh, and made with premium ingredients. Order your favorite burger now.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1525755662778-989d0524087e",
      title: "Authentic Italian Pizza",
      description:
        "Hot, cheesy, and baked to perfection. Taste the real Italian flavor.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
      title: "Fresh Asian Cuisine",
      description:
        "Explore spicy noodles, seafood, and traditional flavors from Asia.",
    },
  ]

  return (
    <div className="w-full mx-auto py-10">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">

                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="max-w-xl text-sm md:text-lg mb-6">
                    {slide.description}
                  </p>
                  <Button size="lg">Order Now</Button>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}