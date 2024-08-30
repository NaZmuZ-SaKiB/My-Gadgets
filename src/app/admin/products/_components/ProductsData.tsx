"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";
import SelectedItemsCount from "@/components/admin/shared/SelectedItemsCount";
import { productSortOptions } from "@/constants";
import ProductsDataTable from "./ProductsDataTable";
import { useState } from "react";

const ProductsData = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-3">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          <SelectedItemsCount count={selectedProducts.length} />

          {/* Product Delete Dialog  */}

          <div className="sm:hidden">
            <DataLimitSelect />
          </div>

          <DataSortBySelect options={productSortOptions} />

          <DataSortOrderSelect />
        </div>

        <DataSearchBox />
      </AFloatingBox>

      <ProductsDataTable
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </div>
  );
};

export default ProductsData;
