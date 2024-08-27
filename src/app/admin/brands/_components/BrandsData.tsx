"use client";

import { useState } from "react";
import BrandsTable from "./BrandsTable";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import SelectedItemsCount from "@/components/admin/shared/SelectedItemsCount";
import BrandDeleteDialog from "./BrandDeleteDialog";
import { Button } from "@/components/ui/button";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import { brandSortOptions } from "@/constants";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";

const BrandsData = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-3 h-full">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          <SelectedItemsCount count={selectedBrands.length} />

          <BrandDeleteDialog
            brands={selectedBrands}
            setBrands={setSelectedBrands}
          >
            <Button
              className="no-focus bg-transparent border border-red-300 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
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
