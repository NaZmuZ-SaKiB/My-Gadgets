"use client";

import { useState } from "react";
import CategoriesTable from "./CategoriesTable";

const CategoriesData = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-3 h-full">
      <CategoriesTable
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
  );
};

export default CategoriesData;
