import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import CategoryCreateForm from "./_components/CategoryCreateForm";

const CategoriesPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Product Categories" />
      <AGrid>
        <div>
          <CategoryCreateForm />
        </div>
        <div></div>
      </AGrid>
    </APageContainer>
  );
};

export default CategoriesPage;
