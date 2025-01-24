import { Loader2 } from "lucide-react";

const SettingsLoading = () => {
  return (
    <div className="grid h-full place-items-center">
      <Loader2 className="mx-auto size-[100px] animate-spin text-primary" />
    </div>
  );
};

export default SettingsLoading;
