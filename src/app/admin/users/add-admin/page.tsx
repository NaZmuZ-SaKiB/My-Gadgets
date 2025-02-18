"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AGrid from "@/components/admin/admin-ui/AGrid";
import MGForm from "@/components/global/forms/MGForm";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGButton from "@/components/global/shared/MGButton";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

import { useCreateAdminMutation } from "@/lib/queries/user.query";
import { AuthValidation } from "@/lib/validations/auth.validation";

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

const AddAdminPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: createAdminFn, isPending } = useCreateAdminMutation();

  const handleSignIn: SubmitHandler<
    z.infer<typeof AuthValidation.signUp>
  > = async (values) => {
    try {
      const result = await createAdminFn(values);

      if (result?.success) {
        toast.success(result.message);
      } else {
        toast.error(result?.message || "A server error occurred");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred");
    }
  };
  return (
    <APageContainer>
      <APageHeading title="Add new admin" />

      <AGrid>
        <AFloatingBox>
          <MGForm
            onSubmit={handleSignIn}
            defaultValues={defaultValues}
            resolver={zodResolver(AuthValidation.signUp)}
          >
            <MGAInput name="name" label="Name" />

            <MGAInput name="email" label="Email" type="email" />

            <MGAInput
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
            />

            <span
              className="cursor-pointer text-sm font-medium text-primary"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </span>

            <MGButton
              className="h-auto self-start rounded-none px-5 py-2"
              disabled={isPending}
            >
              {!isPending ? "Create Admin" : "Creating new admin..."}
            </MGButton>
          </MGForm>
        </AFloatingBox>
      </AGrid>
    </APageContainer>
  );
};

export default AddAdminPage;
