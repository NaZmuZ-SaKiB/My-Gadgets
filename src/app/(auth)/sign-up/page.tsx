import Image from "next/image";

import SignUpForm from "./SignUpForm";
import { images } from "@/constants";

const SignUpPage = () => {
  return (
    <main className="grid min-h-svh place-items-center bg-white xs:bg-slate-50">
      <div className="mx-auto flex w-full max-w-[400px] flex-col gap-4 bg-white px-4 py-10 shadow-slate-300 xs:rounded-2xl xs:shadow-2xl">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-full border border-primary p-2">
            <Image src={images.logo} width={40} height={40} alt="My Gadgets" />
          </div>

          <h1 className="text-lg font-semibold">My Gadgets</h1>
        </div>

        <div className="mb-5">
          <h2 className="mb-1 text-center text-3xl font-semibold text-slate-800">
            Welcome!
          </h2>
          <p className="text-center text-xs text-slate-500">
            Create your account
          </p>
        </div>

        <SignUpForm />
      </div>
    </main>
  );
};

export default SignUpPage;
