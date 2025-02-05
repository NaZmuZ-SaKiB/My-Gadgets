const MainLoading = () => {
  return (
    <div className="mg-container">
      <div className="pb-2 pt-4 sm:pb-4 md:pt-8">
        <div className="aspect-[16/5] w-full animate-pulse overflow-hidden rounded-lg bg-slate-100 sm:rounded-2xl"></div>
      </div>
      <div className="flex gap-3">
        <div className="aspect-[16/8] w-full animate-pulse overflow-hidden rounded-lg bg-slate-100 sm:rounded-2xl"></div>
        <div className="aspect-[16/8] w-full animate-pulse overflow-hidden rounded-lg bg-slate-100 sm:rounded-2xl"></div>
        <div className="aspect-[16/8] w-full animate-pulse overflow-hidden rounded-lg bg-slate-100 max-md:hidden sm:rounded-2xl"></div>
      </div>

      <div className="pb-4 pt-4 md:pt-6">
        <h2 className="text-2xl font-bold text-slate-700 md:text-3xl">
          Featured Categories
        </h2>

        <div className="mt-5 flex flex-wrap gap-3 md:mt-8 md:gap-4">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div
                key={`featured-cats-loading-${i}`}
                className="aspect-square max-h-[130px] flex-1 basis-32 animate-pulse rounded-xl bg-slate-100 sm:basis-56"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainLoading;
