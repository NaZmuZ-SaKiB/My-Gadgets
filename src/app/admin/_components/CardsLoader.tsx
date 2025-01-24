import { cn } from "@/lib/utils";

const CardsLoader = () => {
  return (
    <div className="grid gap-5 xs:grid-cols-2 md:grid-cols-3">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            key={`dashboard-card-loading-${index}`}
            className={cn("h-[170px] animate-pulse rounded-xl bg-slate-200", {
              "row-span-2 h-auto max-md:order-5 max-md:h-80 xs:col-span-2 md:col-span-1":
                index === 2,
            })}
          ></div>
        ))}
    </div>
  );
};

export default CardsLoader;
