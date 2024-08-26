"use client";

import { useState } from "react";
import CategoriesTable from "./CategoriesTable";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";

const CategoriesData = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-3 h-full">
      <AFloatingBox>
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
