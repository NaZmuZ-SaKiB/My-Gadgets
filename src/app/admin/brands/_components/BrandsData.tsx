"use client";

import { useState } from "react";

import BrandsTable from "./BrandsTable";
import { Button } from "@/components/ui/button";
import BrandDeleteDialog from "./BrandDeleteDialog";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import SelectedItemsCount from "@/components/admin/shared/SelectedItemsCount";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";

import { brandSortOptions } from "@/constants";

const BrandsData = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  return (
    <div className="flex h-full flex-col gap-3">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <SelectedItemsCount count={selectedBrands.length} />

          <BrandDeleteDialog
            brands={selectedBrands}
            setBrands={setSelectedBrands}
          >
            <Button
              className="no-focus border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white"
              disabled={selectedBrands.length === 0}
            >
              Delete
            </Button>
          </BrandDeleteDialog>

          <div className="sm:hidden">
            <DataLimitSelect />
          </div>

          <DataSortBySelect options={brandSortOptions} />

          <DataSortOrderSelect />
        </div>

        <DataSearchBox />
      </AFloatingBox>

      <BrandsTable
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
      />
    </div>
  );
};

export default BrandsData;
