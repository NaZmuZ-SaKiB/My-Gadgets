const MyOrdersLoading = () => {
  return (
    <div className="lg:mg-container">
      <h1 className="mb-4 text-3xl font-semibold text-slate-700">
        Your Orders
      </h1>

      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div
            key={`my-order-table-loading-${i}`}
            className="mb-1 h-9 w-full animate-pulse bg-slate-100"
          ></div>
        ))}
    </div>
  );
};

export default MyOrdersLoading;
