const AddressesLoading = () => {
  return (
    <div className="lg:mg-container">
      <h1 className="mb-4 text-3xl font-semibold text-slate-700">
        Your Addresses
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={`my-addresses-loading-${i}`}
              className="h-[160px] w-full animate-pulse rounded-lg bg-slate-200"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default AddressesLoading;
