import ProductSlider from "@/components/global/shared/ProductSlider";
import ProductCardVertical from "@/components/global/cards/ProductCardVertical";

import { productGetAllAction } from "@/lib/actions/product.action";
import { TProduct } from "@/types/product.type";

const RelatedProducts = async ({ category }: { category: string }) => {
  const productsData = await productGetAllAction(
    `category=${category}&limit=10`,
  );
  const products: TProduct[] = productsData.data || [];

  return (
    <div className="max-lg:col-span-4">
      <div className="mb-1 py-3 text-xl font-bold text-slate-700">
        Related Products
      </div>
      <div className="space-y-3 max-lg:hidden">
        {products.map((product) => (
          <div key={`related-product-${product._id}`} className="">
            <ProductCardVertical product={product} size="sm" />
          </div>
        ))}
      </div>

      <div className="mb-5 lg:hidden">
        <ProductSlider products={products} />
      </div>
    </div>
  );
};

export default RelatedProducts;
