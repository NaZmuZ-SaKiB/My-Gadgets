import { Metadata } from "next";
import { Suspense } from "react";

import Filters from "../_components/Filters";
import FilterTopBar from "../_components/FilterTopBar";
import ProductsGrid from "../_components/ProductsGrid";
import BrandsFilter from "../_components/BrandsFilter";
import ProductsLoading from "../_components/ProductsLoading";
import BreadcrumbBar from "@/components/global/shared/Breadcrumb";

type TProps = {
  searchParams: any;
};

export const metadata: Metadata = {
  title: "Search Results",
};

const breadcrumbItems = [
  {
    label: "Shop - All Products",
    link: null,
  },
];

const SearchResultPage = async (props: TProps) => {
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

export default SearchResultPage;
