import { Zap } from "lucide-react";

import FlashSaleCard from "@/components/global/cards/FlashSaleCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { TProduct } from "@/types/product.type";

type TProps = {
  flashSales: { endDate: string | Date; product: TProduct }[];
};

const FlashSaleSection = ({ flashSales }: TProps) => {
  // const productsData = await productGetAllAction("limit=5");
  // const products: TProduct[] = productsData?.data || [];

  return (
    <section className="pb-4 pt-4 md:pt-6">
      <h2 className="flex items-center gap-1 text-3xl font-bold text-slate-700">
        <span>Flash Sale</span>
        <Zap className="text-orange-500" />
      </h2>

      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        className="mt-8 overflow-hidden"
      >
        <CarouselContent className="pb-7">
          {flashSales.map((item) => (
            <CarouselItem
              key={`flash-sale-${item.product._id}`}
              className="basis-full md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
            >
              <FlashSaleCard product={item.product} endDate={item.endDate} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 top-[30%] border-slate-300 bg-opacity-60 backdrop-blur-sm" />
        <CarouselNext className="right-3 top-[30%] border-slate-300 bg-opacity-60 backdrop-blur-sm" />
      </Carousel>
    </section>
  );
};

export default FlashSaleSection;
