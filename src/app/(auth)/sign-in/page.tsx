import { images } from "@/constants";
import Image from "next/image";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return (
    <main className="bg-white xs:bg-slate-50 min-h-svh grid place-items-center">
      <div className="w-full bg-white xs:rounded-2xl px-4 py-10 xs:shadow-2xl shadow-slate-300 max-w-[400px] mx-auto flex flex-col gap-4">
        <div className="flex gap-3 items-center justify-center">
          <div className="p-2 rounded-full border border-primary">
            <Image src={images.logo} width={40} height={40} alt="My Gadgets" />
          </div>

          <h1 className="text-lg font-semibold">My Gadgets</h1>
        </div>

        <div className="mb-5">
          <h2 className="text-3xl font-semibold text-slate-800 text-center mb-1">
            Welcome Back
          </h2>
          <p className="text-slate-500 text-xs text-center">
            Login to your account
          </p>
        </div>

        <SignInForm />
      </div>
    </main>
  );
};

export default SignInPage;
