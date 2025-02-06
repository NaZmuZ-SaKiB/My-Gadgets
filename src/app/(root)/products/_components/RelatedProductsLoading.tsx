const RelatedProductsLoading = () => {
  return (
    <div className="max-lg:col-span-4">
      <div className="mb-1 py-3 text-xl font-bold text-slate-700">
        Related Products
      </div>

      <div className="space-y-3 max-lg:hidden">
        <div className="h-[100px] animate-pulse rounded-xl bg-slate-100"></div>
        <div className="h-[100px] animate-pulse rounded-xl bg-slate-100"></div>
        <div className="h-[100px] animate-pulse rounded-xl bg-slate-100"></div>
      </div>

      <div className="mb-5 flex gap-2 lg:hidden">
        <div className="h-[450px] flex-1 animate-pulse rounded-xl bg-slate-100"></div>
        <div className="h-[450px] flex-1 animate-pulse rounded-xl bg-slate-100"></div>
        <div className="h-[450px] flex-1 animate-pulse rounded-xl bg-slate-100 max-md:hidden"></div>
      </div>
    </div>
  );
};

export default RelatedProductsLoading;
