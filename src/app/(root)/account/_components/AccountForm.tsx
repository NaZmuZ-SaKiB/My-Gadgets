"use client";

import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useMyProfileUpdateMutation } from "@/lib/queries/user.query";
import MGForm from "@/components/global/forms/MGForm";
import MGInput from "@/components/global/forms/MGInput";
import MGButton from "@/components/global/shared/MGButton";

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
      <MGInput name="name" label="Name" />
      <MGInput name="email" label="Email" />

      <MGButton type="submit" className="self-start" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </MGButton>
    </MGForm>
  );
};

export default AccountForm;
