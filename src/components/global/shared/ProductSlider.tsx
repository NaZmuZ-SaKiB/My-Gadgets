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
import { TProduct } from "@/types/product.type";
import ProductCard from "../cards/ProductCard";

const ProductSlider = ({
  products,
  withBanner = false,
}: {
  products: TProduct[];
  withBanner?: boolean;
}) => {
  const plugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnFocusIn: false,
      stopOnMouseEnter: false,
      stopOnLastSnap: false,
    })
  );
  return (
    <Carousel
      opts={{
        loop: true,
        align: "start",
      }}
      plugins={[plugin.current]}
      className="overflow-hidden"
    >
      {/* -ml-2 because used pl-2 in item */}
      <CarouselContent className="-ml-2">
        {products.map((product: TProduct) => (
          <CarouselItem
            key={`sider-${product._id}`}
            className={`basis-1/2 sm:basis-1/3 ${
              withBanner ? "md:basis-1/2" : ""
            } lg:basis-1/3 xl:basis-1/4 pl-2`}
          >
            <ProductCard product={product} showDescription={false} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 top-[40%] bg-opacity-60 border-slate-300 backdrop-blur-sm" />
      <CarouselNext className="right-3 top-[40%] bg-opacity-60 border-slate-300 backdrop-blur-sm" />
    </Carousel>
  );
};

export default ProductSlider;
