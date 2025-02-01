import Cards from "./_components/Cards";
import SalesChart from "./_components/SalesChart";
import AGrid from "@/components/admin/admin-ui/AGrid";
import RecentOrders from "./_components/RecentOrders";
import OrdersPieChart from "./_components/OrdersPieChart";
import TopSellingProducts from "./_components/TopSellingProducts";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import RecentlyAddedProducts from "./_components/RecentlyAddedProducts";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

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
