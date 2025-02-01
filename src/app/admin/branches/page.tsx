import AGrid from "@/components/admin/admin-ui/AGrid";
import BranchesData from "./_components/BranchesData";
import BranchCreateForm from "./_components/BranchCreateForm";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

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
