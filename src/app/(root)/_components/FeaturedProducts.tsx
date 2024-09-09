import ProductSlider from "@/components/global/shared/ProductSlider";
import { images } from "@/constants";
import { productGetAllAction } from "@/lib/actions/product.action";
import { TMedia } from "@/types/media.type";
import { TProduct } from "@/types/product.type";
import Image from "next/image";

type TProps = {
  featuredProducts: { banner?: TMedia; products: TProduct[] }[];
};

const FeaturedProducts = ({ featuredProducts }: TProps) => {
  // const params = new URLSearchParams();
  // params.append("category", "gaming");

  // const productsData = await productGetAllAction(params.toString());
  // const products: TProduct[] = productsData.data || [];

  return (
    <section className="pt-4 md:pt-6 pb-4">
      <h2 className="font-bold text-3xl text-slate-700">Featured Products</h2>

      {featuredProducts.map((item, index) => (
        <div className="flex gap-4 mt-8" key={`featured-products-${index}`}>
          {item.banner && (
            <div className="shrink-0 max-md:hidden relative basis-[280px]">
              <Image
                src={item.banner.secureUrl}
                alt="banner"
                className="object-cover object-center w-72 h-full rounded-2xl"
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
