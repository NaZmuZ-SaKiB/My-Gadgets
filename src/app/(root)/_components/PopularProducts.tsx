import ProductCard from "@/components/global/cards/ProductCard";
import { productGetAllAction } from "@/lib/actions/product.action";
import { TProduct } from "@/types/product.type";

const PopularProducts = async () => {
  const productsData = await productGetAllAction("");
  const products: TProduct[] = productsData?.data || [];

  return (
    <section className="pt-4 md:pt-6 pb-4">
      <h2 className="font-bold text-3xl text-slate-700">Popular Products</h2>

      <div className={`mt-8 ten-products-grid`}>
        {products.map((product) => (
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
