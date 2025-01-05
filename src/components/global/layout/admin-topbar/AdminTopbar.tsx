"use client";

import { USER_ROLE } from "@/constants";
import { useIsUserLoggedInQuery } from "@/lib/queries/auth.query";
import Link from "next/link";

const AdminTopbar = () => {
  const { data: user, isLoading } = useIsUserLoggedInQuery();

  if (isLoading) return null;

  if (!user) return null;
  if (user.role !== USER_ROLE.ADMIN && user.role !== USER_ROLE.SUPER_ADMIN)
    return null;

  return (
    <div className="mg-container bg-slate-700 text-sm max-xl:hidden">
      <div className="flex">
        <Link
          href="/admin"
          className="px-3 py-1 text-slate-50 hover:bg-slate-500"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminTopbar;
