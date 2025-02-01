"use client";

import { useState } from "react";

import BranchesTable from "./BranchesTable";
import { Button } from "@/components/ui/button";
import BranchDeleteDialog from "./BranchDeleteDialog";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import SelectedItemsCount from "@/components/admin/shared/SelectedItemsCount";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";

import { branchSortOptions } from "@/constants";

const BranchesData = () => {
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  return (
    <div className="flex h-full flex-col gap-3">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <SelectedItemsCount count={selectedBranches.length} />

          <BranchDeleteDialog
            branches={selectedBranches}
            setBranches={setSelectedBranches}
          >
            <Button
              className="no-focus border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white"
              disabled={selectedBranches.length === 0}
            >
              Delete
            </Button>
          </BranchDeleteDialog>

          <div className="sm:hidden">
            <DataLimitSelect />
          </div>

          <DataSortBySelect options={branchSortOptions} />

          <DataSortOrderSelect />
        </div>

        <DataSearchBox />
      </AFloatingBox>

      <BranchesTable
        selectedBranches={selectedBranches}
        setSelectedBranches={setSelectedBranches}
      />
    </div>
  );
};

export default BranchesData;
