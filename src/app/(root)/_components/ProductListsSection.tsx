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
    <div className="flex flex-col gap-4 mt-6">
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
    <section className="pt-4 md:pt-6 pb-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1 lg:auto-rows-[0] 2xl:grid-cols-4 gap-10 overflow-hidden">
        <div>
          <h2 className="font-bold text-2xl text-slate-700">Top Selling</h2>
          <div className="h-[3px] w-24 bg-primary mt-4 -mb-[1px]"></div>
          <div className="h-[1px] w-full bg-slate-300"></div>

          <ProductList products={topSelling} title="top-selling" />
        </div>

        <div>
          <h2 className="font-bold text-2xl text-slate-700">
            Trending Products
          </h2>
          <div className="h-[3px] w-24 bg-primary mt-4 -mb-[1px]"></div>
          <div className="h-[1px] w-full bg-slate-300"></div>

          <ProductList products={trendingProducts} title="trending-products" />
        </div>

        <div>
          <h2 className="font-bold text-2xl text-slate-700">Top Rated</h2>
          <div className="h-[3px] w-24 bg-primary mt-4 -mb-[1px]"></div>
          <div className="h-[1px] w-full bg-slate-300"></div>

          <ProductList products={products.slice(4, 8)} title="top-rated" />
        </div>

        <div>
          <h2 className="font-bold text-2xl text-slate-700">Recently Added</h2>
          <div className="h-[3px] w-24 bg-primary mt-4 -mb-[1px]"></div>
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
