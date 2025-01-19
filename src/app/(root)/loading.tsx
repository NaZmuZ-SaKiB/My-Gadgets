const MainLoading = () => {
  return (
    <div className="mg-container">
      <div className="pb-2 pt-4 sm:pb-4 md:pt-8">
        <div className="aspect-[16/5] w-full animate-pulse overflow-hidden rounded-lg bg-slate-200 sm:rounded-2xl"></div>
      </div>
      <div className="flex gap-3">
        <div className="aspect-[16/8] w-full animate-pulse overflow-hidden rounded-lg bg-slate-200 sm:rounded-2xl"></div>
        <div className="aspect-[16/8] w-full animate-pulse overflow-hidden rounded-lg bg-slate-200 sm:rounded-2xl"></div>
        <div className="aspect-[16/8] w-full animate-pulse overflow-hidden rounded-lg bg-slate-200 max-md:hidden sm:rounded-2xl"></div>
      </div>
    </div>
  );
};

export default MainLoading;
