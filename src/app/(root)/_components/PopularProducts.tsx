import ProductCard from "@/components/global/cards/ProductCard";
import { TProduct } from "@/types/product.type";

type TProps = {
  popularProducts: TProduct[];
};

const PopularProducts = ({ popularProducts }: TProps) => {
  // const productsData = await productGetAllAction("");
  // const products: TProduct[] = productsData?.data || [];

  return (
    <section className="pb-4 pt-4 md:pt-6">
      <h2 className="text-3xl font-bold text-slate-700">Popular Products</h2>

      <div className={`ten-products-grid mt-8`}>
        {popularProducts.map((product) => (
          <ProductCard
            key={`popular-product-${product._id}`}
            product={product}
            showDescription={false}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
