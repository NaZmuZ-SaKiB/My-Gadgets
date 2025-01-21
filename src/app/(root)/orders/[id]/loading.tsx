import BreadcrumbBar from "@/components/global/shared/Breadcrumb";

const breadcrumbItems = [
  {
    label: "Orders",
    link: "/account/orders",
  },
  {
    label: "Order Details",
  },
];

const SingleOrderLoading = () => {
  return (
    <div className="mg-container pt-4">
      <BreadcrumbBar items={breadcrumbItems} />
      <div className="mt-5 sm:mt-3 sm:rounded-xl sm:border sm:border-slate-200 sm:p-4">
        <div className="h-[250px] w-full animate-pulse rounded-xl bg-slate-200"></div>

        <div className="mt-4">
          <div className="mb-1 h-10 w-full animate-pulse bg-slate-200"></div>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={`compare-table-loading-${i}`}
                className="mb-1 h-12 w-full animate-pulse bg-slate-200"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SingleOrderLoading;
