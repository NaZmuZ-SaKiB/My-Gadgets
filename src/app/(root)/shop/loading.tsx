import ProductCardLoader from "@/components/global/shared/ProductCardLoader";

const ShopPageLoading = () => {
  return (
    <div className="mg-container py-4">
      <div className="h-12 animate-pulse rounded-xl bg-slate-100"></div>

      <div className="mt-3 h-14 animate-pulse rounded-xl bg-slate-100"></div>

      <div className="mt-3 grid-cols-[250px_1fr] gap-3 lg:grid">
        <div className="bg-white max-lg:hidden">
          <div className="flex flex-col gap-3">
            <div className="h-[150px] w-full animate-pulse rounded-xl bg-slate-100"></div>
            <div className="h-[250px] w-full animate-pulse rounded-xl bg-slate-100"></div>
            <div className="h-[250px] w-full animate-pulse rounded-xl bg-slate-100"></div>
          </div>
        </div>

        <div>
          <div className="h-12 animate-pulse rounded-xl bg-slate-100"></div>

          <div className="mg-shop-grid mt-3">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <ProductCardLoader size="lg" key={`product-card-loader-${i}`} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPageLoading;
