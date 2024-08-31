"use client";

import { useState } from "react";
import BranchesTable from "./BranchesTable";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import SelectedItemsCount from "@/components/admin/shared/SelectedItemsCount";
import BranchDeleteDialog from "./BranchDeleteDialog";
import { Button } from "@/components/ui/button";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import { branchSortOptions } from "@/constants";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";

const BranchesData = () => {
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-3 h-full">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          <SelectedItemsCount count={selectedBranches.length} />

          <BranchDeleteDialog
            branches={selectedBranches}
            setBranches={setSelectedBranches}
          >
            <Button
              className="no-focus bg-transparent border border-red-300 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
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
