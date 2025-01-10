"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import { Button } from "@/components/ui/button";
import { useUserGetAllQuery } from "@/lib/queries/user.query";
import { TUser } from "@/types/user.type";
import { Loader2, ReceiptText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import UserRoleToggleButton from "./UserRoleToggleButton";
import { useIsUserLoggedInQuery } from "@/lib/queries/auth.query";
import MGPagination from "@/components/global/shared/MGPagination";

const UsersTable = () => {
  const searchParams = useSearchParams();

  const { data: user, isLoading: userLoading } = useIsUserLoggedInQuery();
  const { data, isLoading } = useUserGetAllQuery(searchParams.toString());

  if (isLoading || userLoading) {
    return (
      <AFloatingBox className="grid flex-1 place-items-center">
        <Loader2 className="mx-auto size-[50px] animate-spin text-primary-hover" />
      </AFloatingBox>
    );
  }

  return (
    <AFloatingBox className="overflow-x-auto">
      <table className="admin-table min-w-[800px] table-auto">
        <thead className="text-left">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((item: TUser) => (
            <tr
              key={`${item._id}`}
              className={user?._id === item._id ? "bg-green-100" : ""}
            >
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                <div className="flex justify-end gap-1 max-md:flex-wrap">
                  <Link href={`/admin/users/${item._id}/orders`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="no-focus group h-8 border-slate-300 bg-transparent hover:border-slate-600 hover:bg-slate-600"
                    >
                      <ReceiptText className="size-4 text-slate-700 group-hover:text-white" />
                    </Button>
                  </Link>

                  {user?._id !== item._id && (
                    <UserRoleToggleButton user={item} />
                  )}
                </div>
              </td>
            </tr>
          ))}

          {data?.data?.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-xl">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-5 flex items-center justify-center gap-3 sm:justify-between">
        <div className="max-sm:hidden">
          <DataLimitSelect />
        </div>
        <MGPagination
          admin
          limit={data?.meta?.limit as number}
          page={data?.meta?.page as number}
          total={data?.meta?.total as number}
        />
      </div>
    </AFloatingBox>
  );
};

export default UsersTable;
