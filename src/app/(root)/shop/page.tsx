import { Metadata } from "next";
import { Suspense } from "react";

import Filters from "./_components/Filters";
import FilterTopBar from "./_components/FilterTopBar";
import BrandsFilter from "./_components/BrandsFilter";
import BreadcrumbBar from "@/components/global/shared/Breadcrumb";

import ProductsGrid from "./_components/ProductsGrid";
import ProductsLoading from "./_components/ProductsLoading";
import { ReadonlyURLSearchParams } from "next/navigation";

type TProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop for the latest gadgets and accessories at My Gadgets.",
};

const breadcrumbItems = [
  {
    label: "Shop - All Products",
    link: null,
  },
];

const ShopPage = async (props: TProps) => {
  const searchParams = await props.searchParams;
  const params = new URLSearchParams(searchParams);

  return (
    <div className="mg-container py-4">
      <BreadcrumbBar items={breadcrumbItems} />

      <BrandsFilter />

      <div className="mt-3 grid-cols-[250px_1fr] gap-3 lg:grid">
        <div className="bg-white max-lg:hidden">
          <Filters />
        </div>
        <div>
          <FilterTopBar />

          <Suspense key={`${params.toString()}`} fallback={<ProductsLoading />}>
            <ProductsGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
