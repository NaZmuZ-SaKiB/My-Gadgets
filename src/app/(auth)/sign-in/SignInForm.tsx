"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import MGForm from "@/components/global/forms/MGForm";
import MGInput from "@/components/global/forms/MGInput";
import MGButton from "@/components/global/shared/MGButton";

import { USER_ROLE } from "@/constants";
import { useSignInMutation } from "@/lib/queries/auth.query";
import { AuthValidation } from "@/lib/validations/auth.validation";

const defaultValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const router = useRouter();

  const { mutateAsync: signInFn, isPending } = useSignInMutation();

  const handleSignIn: SubmitHandler<
    z.infer<typeof AuthValidation.signIn>
  > = async (values) => {
    try {
      const result = await signInFn(values);

      if (result?.success) {
        if (from) {
          router.push(from);
        } else if (result?.data?.user?.role === USER_ROLE.USER) {
          router.push("/");
        } else {
          router.push("/admin");
        }

        toast.success("Logged in successfully");
      } else {
        toast.error(result?.message || "A server error occurred");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred");
    }
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
          className="absolute right-0 top-0 grid h-full cursor-pointer place-items-center rounded-xl bg-slate-100 px-3 text-slate-500 hover:text-primary-hover"
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
        className="no-focus mb-3 self-end text-xs text-slate-500 hover:text-primary-hover hover:underline focus:text-primary-hover focus:underline"
      >
        Forgot Password?
      </Link>

      <MGButton className="mb-5 h-auto p-4" disabled={isPending}>
        {!isPending ? "Login" : "Logging in..."}
      </MGButton>

      <p className="text-center text-xs">
        {"Don't"} have an account?{" "}
        <Link
          href={`/sign-up`}
          className="no-focus self-end text-primary-hover hover:underline focus:underline"
        >
          SignUp
        </Link>
      </p>
    </MGForm>
  );
};

export default SignInForm;
