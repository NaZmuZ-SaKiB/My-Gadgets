import APageHeading from "@/components/admin/admin-ui/APageHeading";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

const MediaPageLoading = () => {
  return (
    <APageContainer>
      <APageHeading title="Media" />

      <div className="mt-5 h-14 animate-pulse bg-slate-200"></div>
      <div className="mt-5 h-[500px] animate-pulse bg-slate-200"></div>
    </APageContainer>
  );
};

export default MediaPageLoading;
