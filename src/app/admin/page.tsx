import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import Cards from "./_components/Cards";
import TopSellingProducts from "./_components/TopSellingProducts";

const AdminDashboardPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Dashboard" />

      <Cards />

      <TopSellingProducts />
    </APageContainer>
  );
};

export default AdminDashboardPage;
