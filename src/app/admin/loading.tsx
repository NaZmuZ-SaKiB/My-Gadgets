import CardsLoader from "./_components/CardsLoader";
import TopSellingLoading from "./_components/TopSellingLoading";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

import { cn } from "@/lib/utils";

const AdminDashboardLoading = () => {
  return (
    <APageContainer>
      <AFloatingBox className="flex justify-between">
        <div className="flex items-center">
          <h1 className={cn("text-xl font-bold text-slate-700")}>Dashboard</h1>
        </div>
      </AFloatingBox>

      <CardsLoader />

      <TopSellingLoading />
    </APageContainer>
  );
};

export default AdminDashboardLoading;
