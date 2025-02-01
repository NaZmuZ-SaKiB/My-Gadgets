"use client";

import ProductsTable from "../products/_components/ProductsTable";

import { TProduct } from "@/types/product.type";
import { useProductGetAllQuery } from "@/lib/queries/product.query";

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
