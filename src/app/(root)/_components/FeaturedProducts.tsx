import Image from "next/image";

import { TMedia } from "@/types/media.type";
import { TProduct } from "@/types/product.type";

import ProductSlider from "@/components/global/shared/ProductSlider";
import { cn } from "@/lib/utils";

type TProps = {
  featuredProducts: { banner?: TMedia; products: TProduct[] }[];
};

const FeaturedProducts = ({ featuredProducts }: TProps) => {
  // const params = new URLSearchParams();
  // params.append("category", "gaming");

  // const productsData = await productGetAllAction(params.toString());
  // const products: TProduct[] = productsData.data || [];

  return (
    <section className="pb-4 pt-4 md:pt-6">
      <h2 className="text-3xl font-bold text-slate-700">Featured Products</h2>

      {featuredProducts.map((item, index) => (
        <div className="mt-8 flex gap-4" key={`featured-products-${index}`}>
          {item.banner && (
            <div
              className={cn("relative shrink-0 basis-[280px] max-md:hidden", {
                "order-2": index % 2 === 1,
              })}
            >
              <Image
                src={item.banner.secureUrl}
                alt="banner"
                className="h-full w-72 rounded-2xl object-cover object-center"
                fill
              />
            </div>
          )}

          <ProductSlider products={item.products} withBanner />
        </div>
      ))}
    </section>
  );
};

export default FeaturedProducts;
