import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import MediaData from "./_components/MediaData";

const MediaPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Media" />

      <MediaData />
    </APageContainer>
  );
};

export default MediaPage;
