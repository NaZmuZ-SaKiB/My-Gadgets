"use client";

import MGForm from "@/components/global/forms/MGForm";
import MGInput from "@/components/global/forms/MGInput";
import MGButton from "@/components/global/shared/MGButton";
import { useCurrentUserQuery } from "@/lib/queries/auth.query";
import { SubmitHandler } from "react-hook-form";

const AccountPage = () => {
  const { data: user, isLoading } = useCurrentUserQuery();

  const handleUpdate: SubmitHandler<{ name: string; email: string }> = async (
    values
  ) => {
    console.log(values);
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

        <MGButton type="submit" className="self-start">
          Save Changes
        </MGButton>
      </MGForm>
    </div>
  );
};

export default AccountPage;
