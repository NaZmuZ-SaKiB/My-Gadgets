const SingleProductLoading = () => {
  return (
    <div className="mg-container p-4">
      <div className="h-12 animate-pulse rounded-xl bg-slate-200"></div>

      <section className="py-4">
        <div className="grid gap-8 md:grid-cols-[40%_1fr]">
          <div className="aspect-square w-full animate-pulse rounded-2xl bg-slate-200"></div>

          <div>
            <div className="h-10 w-[80%] animate-pulse rounded-full bg-slate-200"></div>

            <div className="mt-5 flex gap-3">
              <div className="h-14 w-[20%] animate-pulse rounded-full bg-slate-200"></div>
              <div className="h-14 w-[20%] animate-pulse rounded-full bg-slate-200"></div>
            </div>

            <div className="mt-5 h-10 w-[20%] animate-pulse rounded-full bg-slate-200"></div>

            <div className="mt-5 h-8 w-[18%] animate-pulse rounded-full bg-slate-200"></div>
            <div className="mt-3 h-4 w-[20%] animate-pulse rounded-full bg-slate-200"></div>
            <div className="mt-3 h-4 w-[30%] animate-pulse rounded-full bg-slate-200"></div>
            <div className="mt-3 h-4 w-[25%] animate-pulse rounded-full bg-slate-200"></div>
            <div className="mt-3 h-4 w-[20%] animate-pulse rounded-full bg-slate-200"></div>
            <div className="mt-3 h-4 w-[30%] animate-pulse rounded-full bg-slate-200"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProductLoading;
