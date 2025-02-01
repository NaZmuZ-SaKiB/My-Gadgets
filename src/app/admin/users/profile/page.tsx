"use client";

import { Loader2 } from "lucide-react";

import AccountForm from "./AccountForm";
import ChangePasswordForm from "./ChangePasswordForm";
import AGrid from "@/components/admin/admin-ui/AGrid";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

import { useCurrentUserQuery } from "@/lib/queries/auth.query";

const AdminProfilePage = () => {
  const { data: user, isLoading: userLoading } = useCurrentUserQuery();

  if (userLoading) {
    return (
      <APageContainer>
        <div className="grid flex-1 place-items-center">
          <Loader2 className="mx-auto size-[50px] animate-spin text-primary-hover" />
        </div>
      </APageContainer>
    );
  }

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
  };

  return (
    <APageContainer>
      <APageHeading title="Your Profile" />

      <AGrid>
        <AFloatingBox>
          <h2 className="mb-5 text-lg font-medium text-slate-700">
            Basic Info
          </h2>

          <AccountForm defaultValues={defaultValues} />
        </AFloatingBox>
      </AGrid>

      <AGrid>
        <AFloatingBox>
          <h2 className="mb-5 text-lg font-medium text-slate-700">
            Change Password
          </h2>

          <ChangePasswordForm />
        </AFloatingBox>
      </AGrid>
    </APageContainer>
  );
};

export default AdminProfilePage;
