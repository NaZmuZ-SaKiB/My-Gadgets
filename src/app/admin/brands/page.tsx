import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import BrandCreateForm from "./_components/BrandCreateForm";
import BrandsData from "./_components/BrandsData";

const BrandsPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Product Brands" />

      <AGrid>
        <div className="mb-3">
          <BrandCreateForm />
        </div>
        <div>
          <BrandsData />
        </div>
      </AGrid>
    </APageContainer>
  );
};

export default BrandsPage;
