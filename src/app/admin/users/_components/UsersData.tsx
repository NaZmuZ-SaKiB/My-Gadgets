"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";
import SelectedItemsCount from "@/components/admin/shared/SelectedItemsCount";
import { Button } from "@/components/ui/button";
import { userSortOptions } from "@/constants";
import { useState } from "react";
import UsersTable from "./UsersTable";

const UsersData = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-3">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <SelectedItemsCount count={selectedUsers.length} />

          <Button
            className="no-focus border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white"
            disabled={selectedUsers.length === 0}
          >
            Delete
          </Button>

          <div className="sm:hidden">
            <DataLimitSelect />
          </div>

          <DataSortBySelect options={userSortOptions} />

          <DataSortOrderSelect />
        </div>

        <DataSearchBox />
      </AFloatingBox>

      <UsersTable
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    </div>
  );
};

export default UsersData;
