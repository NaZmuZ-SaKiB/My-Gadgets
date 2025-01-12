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
import ProductDeleteDialog from "@/components/global/shared/ProductDeleteDialog";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useProductGetAllQuery } from "@/lib/queries/product.query";
import { TProduct } from "@/types/product.type";

const ProductsData = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const { data, isLoading } = useProductGetAllQuery(searchParams.toString());
  const products: TProduct[] = data?.data || [];

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
        products={products}
        isLoading={isLoading}
        meta={data?.meta}
      />
    </div>
  );
};

export default ProductsData;
