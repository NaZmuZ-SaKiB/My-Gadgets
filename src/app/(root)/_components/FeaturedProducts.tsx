import ProductSlider from "@/components/global/shared/ProductSlider";
import { images } from "@/constants";
import { productGetAllAction } from "@/lib/actions/product.action";
import { TProduct } from "@/types/product.type";
import Image from "next/image";

const FeaturedProducts = async () => {
  const params = new URLSearchParams();
  params.append("category", "gaming");

  const productsData = await productGetAllAction(params.toString());
  const products: TProduct[] = productsData.data || [];

  return (
    <section className="pt-4 md:pt-6 pb-4">
      <h2 className="font-bold text-3xl text-slate-700">Featured Products</h2>

      <div className="flex gap-4 mt-8">
        <div className="shrink-0 max-md:hidden">
          <Image
            src={images.defaultBanner4}
            alt="banner"
            className="object-cover object-center w-72 h-full rounded-2xl"
          />
        </div>

        <ProductSlider products={products} withBanner />
      </div>
    </section>
  );
};

export default FeaturedProducts;
