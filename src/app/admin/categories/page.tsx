import AGrid from "@/components/admin/admin-ui/AGrid";
import CategoriesData from "./_components/CategoriesData";
import CategoryCreateForm from "./_components/CategoryCreateForm";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

const CategoriesPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Product Categories" />
      <AGrid>
        <div className="mb-3">
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
