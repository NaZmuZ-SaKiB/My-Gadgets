import MGSwitch from "@/components/global/forms/MGSwitch";
import { AQTags } from "@/constants";
import { useBrandToggleFeaturedMutation } from "@/lib/queries/brand.query";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type TProps = {
  id: string;
  defaultValue: boolean;
  label?: string;
  className?: string;
};

const FeaturedSwitch = ({ id, defaultValue, label, className }: TProps) => {
  const [isFeatured, setIsFeatured] = useState(defaultValue);

  const queryClient = useQueryClient();

  const { mutateAsync: toggleFeatured, isPending } =
    useBrandToggleFeaturedMutation();

  const handleFeaturedToggle = async () => {
    try {
      const result = await toggleFeatured(id);

      if (result?.success) {
        toast.success(result?.message);
        setIsFeatured(!isFeatured);
        queryClient.invalidateQueries({
          queryKey: [AQTags.BRAND],
          exact: false,
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
        setIsFeatured(defaultValue);
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
      setIsFeatured(defaultValue);
    }
  };

  return (
    <MGSwitch
      label={label}
      defaultValue={isFeatured}
      handleChange={handleFeaturedToggle}
      loading={isPending}
      className={className}
    />
  );
};

export default FeaturedSwitch;
