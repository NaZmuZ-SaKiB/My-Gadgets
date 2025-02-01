"use client";

import UsersTable from "./UsersTable";
import UserRoleFilter from "./UserRoleFilter";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";

import { userSortOptions } from "@/constants";

const UsersData = () => {
  return (
    <div className="flex flex-col gap-3">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <UserRoleFilter />

          <div className="sm:hidden">
            <DataLimitSelect />
          </div>

          <DataSortBySelect options={userSortOptions} />

          <DataSortOrderSelect />
        </div>

        <DataSearchBox />
      </AFloatingBox>

      <UsersTable />
    </div>
  );
};

export default UsersData;
