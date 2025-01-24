import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";

const TopSellingLoading = () => {
  return (
    <AFloatingBox>
      <h2 className="mb-5 text-lg font-medium text-slate-700">
        Top Selling Products
      </h2>

      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div
            key={`topselling-table-loading-${i}`}
            className="mb-1 h-12 w-full animate-pulse bg-slate-100"
          ></div>
        ))}
    </AFloatingBox>
  );
};

export default TopSellingLoading;
