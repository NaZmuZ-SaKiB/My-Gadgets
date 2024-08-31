import MGSwitch from "@/components/global/forms/MGSwitch";
import { AQTags } from "@/constants";
import { useCategoryToggleShowOnTopMenuMutation } from "@/lib/queries/category.query";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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
  const [isShowOnTopMenu, setIsShowOnTopMenu] = useState(defaultValue);

  const queryClient = useQueryClient();

  const { mutateAsync: toggleShowOnTopMenu, isPending } =
    useCategoryToggleShowOnTopMenuMutation();

  const handleShowOnTopMenuToggle = async () => {
    try {
      const result = await toggleShowOnTopMenu(id);

      if (result?.success) {
        toast.success(result?.message);
        setIsShowOnTopMenu(!isShowOnTopMenu);

        queryClient.invalidateQueries({
          queryKey: [AQTags.CATEGORY],
          exact: false,
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
        setIsShowOnTopMenu(defaultValue);
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
      setIsShowOnTopMenu(defaultValue);
    }
  };
  return (
    <MGSwitch
      label={label}
      defaultValue={isShowOnTopMenu}
      handleChange={handleShowOnTopMenuToggle}
      loading={isPending}
      className={className}
    />
  );
};

export default ShowOnTopMenuSwitch;
