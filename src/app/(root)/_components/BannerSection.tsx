"use client";
import { useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { images } from "@/constants";
import Image from "next/image";

const BannerSection = () => {
  const plugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnFocusIn: false,
      stopOnMouseEnter: false,
      stopOnLastSnap: false,
    })
  );

  const sliderImages = [images.defaultSliderImage1, images.defaultSliderImage2];

  return (
    <section className="pt-4 md:pt-8 pb-2 sm:pb-4">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
        className="rounded-2xl overflow-hidden mb-4"
      >
        {/* -ml-0 because used pl-0 in item */}
        <CarouselContent className="-ml-0">
          {sliderImages.map((image, i) => (
            <CarouselItem
              key={`slider-img-${i}`}
              className="pl-0 relative w-full aspect-[100/35]"
            >
              <Image src={image.src} alt={`slider-${i}`} fill className="" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 bg-opacity-70 border-gray-300 backdrop-blur-sm" />
        <CarouselNext className="right-3 bg-opacity-70 border-gray-300 backdrop-blur-sm" />
      </Carousel>

      <div className="flex max-sm:hidden gap-4">
        <div className="flex-1">
          <Image
            src={images.defaultBanner1}
            alt="banner 1"
            className="rounded-2xl w-full"
          />
        </div>
        <div className="flex-1">
          <Image
            src={images.defaultBanner2}
            alt="banner 2"
            className="rounded-2xl w-full"
          />
        </div>
        <div className="flex-1 max-md:hidden">
          <Image
            src={images.defaultBanner3}
            alt="banner 3"
            className="rounded-2xl w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
