"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import CategoriesTable from "./CategoriesTable";
import CategoryDeleteDialog from "./CategoryDeleteDialog";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import SelectedItemsCount from "@/components/admin/shared/SelectedItemsCount";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";

import { categorySortOptions } from "@/constants";

const CategoriesData = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="flex h-full flex-col gap-3">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <SelectedItemsCount count={selectedCategories.length} />

          <CategoryDeleteDialog
            categories={selectedCategories}
            setCategories={setSelectedCategories}
          >
            <Button
              className="no-focus border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white"
              disabled={selectedCategories.length === 0}
            >
              Delete
            </Button>
          </CategoryDeleteDialog>

          <div className="sm:hidden">
            <DataLimitSelect />
          </div>

          <DataSortBySelect options={categorySortOptions} />

          <DataSortOrderSelect />
        </div>

        <DataSearchBox />
      </AFloatingBox>

      <CategoriesTable
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
  );
};

export default CategoriesData;
