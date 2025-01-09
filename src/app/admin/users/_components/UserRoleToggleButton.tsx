"use client";

import MGButton from "@/components/global/shared/MGButton";
import { AQTags, USER_ROLE } from "@/constants";
import { useUserRoleToggleMutation } from "@/lib/queries/user.query";
import { TUser } from "@/types/user.type";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type TProps = {
  user: TUser;
};

const UserRoleToggleButton = ({ user }: TProps) => {
  const { mutateAsync: roleToggleFn, isPending } = useUserRoleToggleMutation();

  const queryClient = useQueryClient();

  const handleRoleToggle = async () => {
    const values = {
      id: user._id,
      role: user.role === USER_ROLE.ADMIN ? USER_ROLE.USER : USER_ROLE.ADMIN,
    };

    try {
      const result = await roleToggleFn(values);

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.USER, AQTags.ALL],
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
    <MGButton
      onClick={handleRoleToggle}
      disabled={isPending}
      variant="outline"
      size="sm"
      className="h-8 rounded-md border-orange-600 font-normal text-orange-600 hover:bg-orange-600"
    >
      {isPending
        ? "Updating..."
        : user.role === USER_ROLE.ADMIN
          ? "Make User"
          : "Make Admin"}
    </MGButton>
  );
};

export default UserRoleToggleButton;
