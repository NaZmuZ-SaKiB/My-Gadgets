import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import CategoryCreateForm from "./_components/CategoryCreateForm";
import CategoriesData from "./_components/CategoriesData";

const CategoriesPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Product Categories" />
      <AGrid>
        <div>
          <CategoryCreateForm />
        </div>
        <div>
          <CategoriesData />
        </div>
      </AGrid>
    </APageContainer>
  );
};

export default CategoriesPage;
