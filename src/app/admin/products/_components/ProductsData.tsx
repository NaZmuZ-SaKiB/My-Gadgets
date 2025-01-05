"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";
import SelectedItemsCount from "@/components/admin/shared/SelectedItemsCount";
import { productSortOptions } from "@/constants";
import ProductsTable from "./ProductsTable";
import { useState } from "react";
import ProductDeleteDialog from "./ProductDeleteDialog";
import { Button } from "@/components/ui/button";

const ProductsData = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-3">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <SelectedItemsCount count={selectedProducts.length} />

          <ProductDeleteDialog
            products={selectedProducts}
            setProducts={setSelectedProducts}
          >
            <Button
              className="no-focus border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white"
              disabled={selectedProducts.length === 0}
            >
              Delete
            </Button>
          </ProductDeleteDialog>

          <div className="sm:hidden">
            <DataLimitSelect />
          </div>

          <DataSortBySelect options={productSortOptions} />

          <DataSortOrderSelect />
        </div>

        <DataSearchBox />
      </AFloatingBox>

      <ProductsTable
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </div>
  );
};

export default ProductsData;
