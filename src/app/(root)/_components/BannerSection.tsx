"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { images } from "@/constants";
import { TMedia } from "@/types/media.type";

type TProps = {
  sliderImages: TMedia[];
  bannerImage1?: TMedia;
  bannerImage2?: TMedia;
  bannerImage3?: TMedia;
};

const BannerSection = ({
  sliderImages,
  bannerImage1,
  bannerImage2,
  bannerImage3,
}: TProps) => {
  const plugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnFocusIn: false,
      stopOnMouseEnter: false,
      stopOnLastSnap: false,
    }),
  );

  const defaultSliderImages = [
    images.defaultSliderImage1,
    images.defaultSliderImage2,
  ];

  return (
    <section className="pb-2 pt-4 sm:pb-4 md:pt-8">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
        className="mb-4 overflow-hidden rounded-lg sm:rounded-2xl"
      >
        {/* -ml-0 because used pl-0 in item */}
        <CarouselContent className="-ml-0">
          {sliderImages.length > 0
            ? sliderImages.map((image, index) => (
                <CarouselItem
                  key={image._id}
                  className="relative aspect-[100/35] w-full pl-0"
                >
                  <Image
                    src={image.secureUrl}
                    alt={`slider image ${index + 1}`}
                    fill
                    className=""
                  />
                </CarouselItem>
              ))
            : defaultSliderImages.map((image, index) => (
                <CarouselItem
                  key={`slider-image-${index}`}
                  className="relative aspect-[100/35] w-full pl-0"
                >
                  <Image
                    src={image}
                    alt={`default slider image ${index + 1}`}
                    fill
                    className=""
                  />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 border-slate-300 bg-opacity-70 backdrop-blur-sm" />
        <CarouselNext className="right-3 border-slate-300 bg-opacity-70 backdrop-blur-sm" />
      </Carousel>

      <div className="flex gap-3">
        <div className="relative aspect-video flex-1">
          <Image
            fill
            src={bannerImage1?.secureUrl || images.defaultBanner1}
            alt="banner 1"
            className="w-full rounded-lg sm:rounded-2xl"
          />
        </div>
        <div className="relative flex-1">
          <Image
            fill
            src={bannerImage2?.secureUrl || images.defaultBanner2}
            alt="banner 2"
            className="w-full rounded-lg sm:rounded-2xl"
          />
        </div>
        {bannerImage3 && (
          <div className="relative flex-1 max-md:hidden">
            <Image
              fill
              src={bannerImage3?.secureUrl || images.defaultBanner3}
              alt="banner 3"
              className="w-full rounded-lg sm:rounded-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerSection;
