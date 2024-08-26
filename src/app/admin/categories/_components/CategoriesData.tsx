"use client";

import { useState } from "react";
import CategoriesTable from "./CategoriesTable";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import SelectedItemsCount from "@/components/admin/shared/SelectedItemsCount";
import CategoryDeleteDialog from "./CategoryDeleteDialog";
import { Button } from "@/components/ui/button";

const CategoriesData = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-3 h-full">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex gap-2">
          <SelectedItemsCount count={selectedCategories.length} />
          <CategoryDeleteDialog
            categories={selectedCategories}
            setCategories={setSelectedCategories}
          >
            <Button
              size="sm"
              className="h-full no-focus bg-transparent border border-red-300 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
              disabled={selectedCategories.length === 0}
            >
              Delete
            </Button>
          </CategoryDeleteDialog>
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
