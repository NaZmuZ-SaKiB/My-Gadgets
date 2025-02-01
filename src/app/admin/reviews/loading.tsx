import APageHeading from "@/components/admin/admin-ui/APageHeading";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

const ReviewsPageLoading = () => {
  return (
    <APageContainer>
      <APageHeading title="Product Reviews" />

      <div className="h-14 w-full animate-pulse rounded-xl bg-slate-200"></div>
    </APageContainer>
  );
};

export default ReviewsPageLoading;
