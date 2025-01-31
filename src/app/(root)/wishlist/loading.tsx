import BreadcrumbBar from "@/components/global/shared/Breadcrumb";

const WishlistPageLoading = () => {
  return (
    <div className="mg-container pt-4" suppressHydrationWarning>
      <BreadcrumbBar items={[{ label: "Wishlist" }]} />

      <div className="mt-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={`my-order-table-loading-${i}`}
              className="mb-1 h-12 w-full animate-pulse bg-slate-100"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default WishlistPageLoading;
