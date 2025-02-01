"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import MGForm from "@/components/global/forms/MGForm";
import MGInput from "@/components/global/forms/MGInput";
import MGButton from "@/components/global/shared/MGButton";

import { useChangePasswordMutation } from "@/lib/queries/auth.query";
import { AuthValidation } from "@/lib/validations/auth.validation";

const defaultValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: changePasswordFn, isPending } =
    useChangePasswordMutation();

  const handleSubmit: SubmitHandler<
    z.infer<typeof AuthValidation.changePassword>
  > = async (values) => {
    try {
      const result = await changePasswordFn(values);

      if (result?.success) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message || "A server error occurred");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-3xl font-semibold text-slate-700">
        Change Password
      </h1>

      <MGForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(AuthValidation.changePassword)}
      >
        <MGInput
          name="oldPassword"
          label="Old Password"
          type={showPassword ? "text" : "password"}
        />
        <MGInput
          name="newPassword"
          label="New Password"
          type={showPassword ? "text" : "password"}
        />
        <MGInput
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
        />

        <span
          className="cursor-pointer text-sm font-medium text-primary"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"} Password
        </span>

        <MGButton
          type="submit"
          className="self-start rounded-lg"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </MGButton>
      </MGForm>
    </div>
  );
};

export default ChangePasswordPage;
