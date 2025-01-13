"use client";

import { useProductGetAllQuery } from "@/lib/queries/product.query";
import { TProduct } from "@/types/product.type";
import ProductsTable from "../products/_components/ProductsTable";

const RecentlyAddedProducts = () => {
  const { data: productsData, isLoading } = useProductGetAllQuery(`limit=5`);
  const products: TProduct[] = productsData?.data;

  return (
    <div>
      <ProductsTable
        products={products}
        isLoading={isLoading}
        title="Recently Added Products"
      />
    </div>
  );
};

export default RecentlyAddedProducts;
