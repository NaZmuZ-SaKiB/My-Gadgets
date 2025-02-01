import ProductCardVertical from "@/components/global/cards/ProductCardVertical";

import { productGetAllAction } from "@/lib/actions/product.action";
import { TProduct } from "@/types/product.type";

const ProductList = ({
  products,
  title,
}: {
  products: TProduct[];
  title: string;
}) => {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {products.map((product: TProduct) => (
        <ProductCardVertical
          key={`product-${title}-${product._id}-${Math.random()}`}
          product={product}
        />
      ))}
    </div>
  );
};

type TProps = {
  topSelling: TProduct[];
  trendingProducts: TProduct[];
};

const ProductListsSection = async ({
  topSelling,
  trendingProducts,
}: TProps) => {
  const productsData = await productGetAllAction("limit=8");
  const products: TProduct[] = productsData?.data || [];

  return (
    <section className="pb-4 pt-4 md:pt-6">
      <div className="grid gap-10 overflow-hidden sm:grid-cols-2 lg:auto-rows-[0] lg:grid-cols-3 lg:grid-rows-1 2xl:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">Top Selling</h2>
          <div className="-mb-[1px] mt-4 h-[3px] w-24 bg-primary"></div>
          <div className="h-[1px] w-full bg-slate-300"></div>

          <ProductList products={topSelling} title="top-selling" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-700">
            Trending Products
          </h2>
          <div className="-mb-[1px] mt-4 h-[3px] w-24 bg-primary"></div>
          <div className="h-[1px] w-full bg-slate-300"></div>

          <ProductList products={trendingProducts} title="trending-products" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-700">Top Rated</h2>
          <div className="-mb-[1px] mt-4 h-[3px] w-24 bg-primary"></div>
          <div className="h-[1px] w-full bg-slate-300"></div>

          <ProductList products={products.slice(4, 8)} title="top-rated" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-700">Recently Added</h2>
          <div className="-mb-[1px] mt-4 h-[3px] w-24 bg-primary"></div>
          <div className="h-[1px] w-full bg-slate-300"></div>

          <ProductList
            products={products.slice(0, 4)}
            title="trending-products"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductListsSection;
