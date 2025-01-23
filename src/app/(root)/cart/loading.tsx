import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import { Trash2 } from "lucide-react";

const CartPageLoading = () => {
  return (
    <div className="mg-container pt-4">
      <BreadcrumbBar items={[{ label: "Shop" }, { label: "Cart" }]} />

      <div className="mt-5 sm:mt-3 sm:rounded-xl sm:border sm:border-slate-200 sm:p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold text-slate-700">Your Cart</h1>
            <div className="mt-3 h-5 w-[230px] animate-pulse rounded-full bg-slate-100"></div>
          </div>

          <div className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-slate-500 px-2 py-1 text-sm text-slate-500">
            <Trash2 className="size-4" />
            <span className="mt-0.5">Clear Cart</span>
          </div>
        </div>

        <div className="mt-6">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={`my-order-table-loading-${i}`}
                className="mb-1 h-10 w-full animate-pulse bg-slate-100"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CartPageLoading;
