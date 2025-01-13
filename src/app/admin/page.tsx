import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import Cards from "./_components/Cards";
import TopSellingProducts from "./_components/TopSellingProducts";
import AGrid from "@/components/admin/admin-ui/AGrid";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import SalesChart from "./_components/SalesChart";
import OrdersPieChart from "./_components/OrdersPieChart";
import RecentOrders from "./_components/RecentOrders";
import RecentlyAddedProducts from "./_components/RecentlyAddedProducts";

const AdminDashboardPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Dashboard" />

      <Cards />

      <TopSellingProducts />

      <AGrid reverse>
        <SalesChart />

        <OrdersPieChart />
      </AGrid>

      <RecentOrders />

      <RecentlyAddedProducts />
    </APageContainer>
  );
};

export default AdminDashboardPage;
