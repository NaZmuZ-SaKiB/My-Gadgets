"use client";

import MGForm from "@/components/global/forms/MGForm";
import MGInput from "@/components/global/forms/MGInput";
import MGButton from "@/components/global/shared/MGButton";
import { useCurrentUserQuery } from "@/lib/queries/auth.query";
import { useMyProfileUpdateMutation } from "@/lib/queries/user.query";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const AccountPage = () => {
  const { data: user, isLoading, refetch } = useCurrentUserQuery();

  const { mutateAsync: updateAccount, isPending } =
    useMyProfileUpdateMutation();

  const handleUpdate: SubmitHandler<{ name: string; email: string }> = async (
    values
  ) => {
    if (user?.name === values.name && user?.email === values.email) {
      return;
    }

    try {
      const result = await updateAccount(values);

      if (result?.success) {
        toast.success(result?.message);
        refetch();
      } else {
        toast.error(result?.message || "A server error occured");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occured");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const defaultValues = {
    name: user?.name || "",
    email: user?.email,
  };

  return (
    <div className="max-w-md mx-auto">
      <MGForm
        onSubmit={handleUpdate}
        defaultValues={defaultValues}
        reset={false}
      >
        <MGInput name="name" label="Name" />
        <MGInput name="email" label="Email" />

        <MGButton type="submit" className="self-start" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </MGButton>
      </MGForm>
    </div>
  );
};

export default AccountPage;
