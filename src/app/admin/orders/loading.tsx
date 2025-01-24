import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";

const OrdersPageLoading = () => {
  return (
    <APageContainer>
      <APageHeading title="Orders" />

      <div className="h-28 w-full animate-pulse rounded-xl bg-slate-200"></div>
    </APageContainer>
  );
};

export default OrdersPageLoading;
