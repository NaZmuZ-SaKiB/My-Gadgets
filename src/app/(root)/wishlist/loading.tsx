const WishlistPageLoading = () => {
  return (
    <div className="mg-container pt-4">
      <div className="h-12 animate-pulse rounded-xl bg-slate-100"></div>

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
