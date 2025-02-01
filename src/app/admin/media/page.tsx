import MediaData from "./_components/MediaData";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

const MediaPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Media" />

      <MediaData />
    </APageContainer>
  );
};

export default MediaPage;
