import BreadcrumbBar from "@/components/global/shared/Breadcrumb";

const ComparePageLoading = () => {
  return (
    <div className="mg-container pt-4">
      <BreadcrumbBar items={[{ label: "Compare" }]} />

      <div className="mb-1 mt-4 h-40 w-full animate-pulse bg-slate-100"></div>

      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div
            key={`compare-table-loading-${i}`}
            className="mb-1 h-10 w-full animate-pulse bg-slate-100"
          ></div>
        ))}
    </div>
  );
};

export default ComparePageLoading;
