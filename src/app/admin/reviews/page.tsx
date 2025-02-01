import ReviewsData from "./_components/ReviewsData";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

const ReviewsPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Product Reviews" />

      <ReviewsData />
    </APageContainer>
  );
};

export default ReviewsPage;
