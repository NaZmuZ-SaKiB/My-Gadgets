"use client";

import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";

import MGForm from "@/components/global/forms/MGForm";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGButton from "@/components/global/shared/MGButton";

import { useMyProfileUpdateMutation } from "@/lib/queries/user.query";

type TProps = {
  defaultValues: {
    name: string;
    email: string;
  };
};

const AccountForm = ({ defaultValues }: TProps) => {
  const { mutateAsync: updateAccount, isPending } =
    useMyProfileUpdateMutation();

  const handleUpdate: SubmitHandler<{ name: string; email: string }> = async (
    values,
  ) => {
    if (
      defaultValues?.name === values.name &&
      defaultValues?.email === values.email
    ) {
      return;
    }

    try {
      const result = await updateAccount(values);

      if (result?.success) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message || "A server error occured");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occured");
    }
  };
  return (
    <MGForm onSubmit={handleUpdate} defaultValues={defaultValues} reset={false}>
      <MGAInput name="name" label="Name" />
      <MGAInput name="email" label="Email" />

      <MGButton
        type="submit"
        className="self-start rounded-none"
        size="sm"
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Changes"}
      </MGButton>
    </MGForm>
  );
};

export default AccountForm;
