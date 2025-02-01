import OrdersData from "./_components/OrdersData";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

const OrdersPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Orders" />

      <OrdersData />
    </APageContainer>
  );
};

export default OrdersPage;
