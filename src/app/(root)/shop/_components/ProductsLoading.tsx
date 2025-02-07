import ProductCardLoader from "@/components/global/shared/ProductCardLoader";

const ProductsLoading = () => {
  return (
    <div className="mg-shop-grid mt-3">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <ProductCardLoader size="lg" key={`product-card-loader-${i}`} />
        ))}
    </div>
  );
};

export default ProductsLoading;
