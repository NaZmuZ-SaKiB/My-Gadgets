import { Loader2 } from "lucide-react";

const AboutUsLoading = () => {
  return (
    <div className="grid min-h-[90svh] place-items-center">
      <Loader2 className="size-14 animate-spin text-primary" />
    </div>
  );
};

export default AboutUsLoading;
