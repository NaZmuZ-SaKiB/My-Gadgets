const CheckoutOverviewLoading = () => {
  return (
    <div className="col-span-2 border-slate-200 max-sm:border-t max-sm:pt-3 sm:rounded-xl sm:border sm:p-4">
      <h2 className="text-lg font-semibold text-slate-700">Overview</h2>

      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div
            key={`my-order-table-loading-${i}`}
            className="mb-1 h-10 w-full animate-pulse bg-slate-100"
          ></div>
        ))}
    </div>
  );
};

export default CheckoutOverviewLoading;
