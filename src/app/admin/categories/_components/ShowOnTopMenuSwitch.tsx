import MGSwitch from "@/components/global/forms/MGSwitch";
import { AQTags } from "@/constants/tags";
import { useCategoryToggleShowOnTopMenuMutation } from "@/lib/queries/category.query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type TProps = {
  id: string;
  defaultValue: boolean;
  label?: string;
  className?: string;
};

const ShowOnTopMenuSwitch = ({
  id,
  defaultValue,
  label,
  className,
}: TProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: toggleShowOnTopMenu, isPending } =
    useCategoryToggleShowOnTopMenuMutation();

  const handleShowOnTopMenuToggle = async () => {
    try {
      const result = await toggleShowOnTopMenu(id);

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.CATEGORY],
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
      handleChange={handleShowOnTopMenuToggle}
      loading={isPending}
      className={className}
    />
  );
};

export default ShowOnTopMenuSwitch;
