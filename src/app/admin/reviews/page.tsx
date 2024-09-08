import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import ReviewsData from "./_components/ReviewsData";

const ReviewsPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Product Reviews" />

      <ReviewsData />
    </APageContainer>
  );
};

export default ReviewsPage;
