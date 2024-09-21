import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import OrdersData from "./_components/OrdersData";

const OrdersPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Orders" />

      <OrdersData />
    </APageContainer>
  );
};

export default OrdersPage;
