"use client";

import TopSellingLoading from "./TopSellingLoading";
import ProductsTable from "../products/_components/ProductsTable";

import { useProductTopSellingQuery } from "@/lib/queries/product.query";
import { TProduct } from "@/types/product.type";

const TopSellingProducts = () => {
  const { data, isLoading } = useProductTopSellingQuery();
  const products: TProduct[] = data?.data || [];

  console.log(data);

  if (isLoading) return <TopSellingLoading />;
  return (
    <div>
      <ProductsTable
        products={products}
        isLoading={isLoading}
        title="Top Selling Products"
      />
    </div>
  );
};

export default TopSellingProducts;
