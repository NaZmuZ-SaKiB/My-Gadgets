import { currentUser } from "@/lib/actions/auth.action";
import AccountForm from "./_components/AccountForm";

const AccountPage = async () => {
  const user = await currentUser();

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-3xl font-semibold text-slate-700">
        Your Account
      </h1>

      <AccountForm defaultValues={defaultValues} />
    </div>
  );
};

export default AccountPage;
