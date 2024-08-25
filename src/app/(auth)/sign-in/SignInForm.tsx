"use client";

import MGForm from "@/components/global/forms/MGForm";
import MGInput from "@/components/global/forms/MGInput";
import MGButton from "@/components/global/shared/MGButton";
import { AuthValidation } from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const defaultValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn: SubmitHandler<
    z.infer<typeof AuthValidation.signIn>
  > = async (values) => {
    console.log(values);
  };
  return (
    <MGForm
      onSubmit={handleSignIn}
      defaultValues={defaultValues}
      resolver={zodResolver(AuthValidation.signIn)}
    >
      <MGInput name="email" label="Email" type="email" showLabel={false} />

      <div className="relative">
        <MGInput
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          showLabel={false}
        />
        <span
          className="absolute px-3 cursor-pointer h-full grid place-items-center bg-slate-100 right-0 top-0 rounded-xl text-slate-500 hover:text-primary-hover"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Eye className="size-5" />
          ) : (
            <EyeOff className="size-5" />
          )}
        </span>
      </div>
      <Link
        href={`/sign-in`}
        className="mb-3 text-xs hover:underline self-end text-slate-500 no-focus focus:underline hover:text-primary-hover focus:text-primary-hover"
      >
        Forgot Password?
      </Link>

      <MGButton className="h-auto p-4 mb-5">Login</MGButton>

      <p className="text-xs text-center">
        {"Don't"} have an account?{" "}
        <Link
          href={`/sign-up`}
          className="text-primary-hover hover:underline self-end no-focus focus:underline"
        >
          SignUp
        </Link>
      </p>
    </MGForm>
  );
};

export default SignInForm;
