import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import ImageGallery from "./_components/ImageGallery";

const MediaPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Media" />
      <ImageGallery />
    </APageContainer>
  );
};

export default MediaPage;
