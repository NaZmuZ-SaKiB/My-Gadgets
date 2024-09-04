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
    })
  );

  const defaultSliderImages = [
    images.defaultSliderImage1,
    images.defaultSliderImage2,
  ];

  return (
    <section className="pt-4 md:pt-8 pb-2 sm:pb-4">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
        className="rounded-lg sm:rounded-2xl overflow-hidden mb-4"
      >
        {/* -ml-0 because used pl-0 in item */}
        <CarouselContent className="-ml-0">
          {sliderImages.length > 0
            ? sliderImages.map((image, index) => (
                <CarouselItem
                  key={image._id}
                  className="pl-0 relative w-full aspect-[100/35]"
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
                  className="pl-0 relative w-full aspect-[100/35]"
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
        <CarouselPrevious className="left-3 bg-opacity-70 border-slate-300 backdrop-blur-sm" />
        <CarouselNext className="right-3 bg-opacity-70 border-slate-300 backdrop-blur-sm" />
      </Carousel>

      <div className="flex gap-3">
        <div className="flex-1 relative aspect-video">
          <Image
            fill
            src={bannerImage1?.secureUrl || images.defaultBanner1}
            alt="banner 1"
            className="rounded-lg sm:rounded-2xl w-full"
          />
        </div>
        <div className="flex-1 relative">
          <Image
            fill
            src={bannerImage2?.secureUrl || images.defaultBanner2}
            alt="banner 2"
            className="rounded-lg sm:rounded-2xl w-full"
          />
        </div>
        {bannerImage3 && (
          <div className="flex-1 relative max-md:hidden">
            <Image
              fill
              src={bannerImage3?.secureUrl || images.defaultBanner3}
              alt="banner 3"
              className="rounded-lg sm:rounded-2xl w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerSection;
