import MGSwitch from "@/components/global/forms/MGSwitch";
import { AQTags } from "@/constants/tags";
import { useBrandToggleFeaturedMutation } from "@/lib/queries/brand.query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type TProps = {
  id: string;
  defaultValue: boolean;
  label?: string;
  className?: string;
};

const FeaturedSwitch = ({ id, defaultValue, label, className }: TProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: toggleFeatured, isPending } =
    useBrandToggleFeaturedMutation();

  const handleFeaturedToggle = async () => {
    try {
      const result = await toggleFeatured(id);

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.BRAND],
          exact: false,
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  return (
    <MGSwitch
      label={label}
      defaultValue={defaultValue}
      handleChange={handleFeaturedToggle}
      loading={isPending}
      className={className}
    />
  );
};

export default FeaturedSwitch;
