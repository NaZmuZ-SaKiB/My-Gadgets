import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import BranchCreateForm from "./_components/BranchCreateForm";
import BranchesData from "./_components/BranchesData";

const BranchesPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Branches" />

      <AGrid>
        <div className="mb-3">
          <BranchCreateForm />
        </div>
        <div>
          <BranchesData />
        </div>
      </AGrid>
    </APageContainer>
  );
};

export default BranchesPage;
