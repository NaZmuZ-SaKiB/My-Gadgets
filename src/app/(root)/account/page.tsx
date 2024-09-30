"use client";

import { useCurrentUserQuery } from "@/lib/queries/auth.query";

const AccountPage = () => {
  const { data: user, isLoading } = useCurrentUserQuery();

  console.log(user);
  return (
    <div>
      <h1>AccountPage</h1>
    </div>
  );
};

export default AccountPage;
