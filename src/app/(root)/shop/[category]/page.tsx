import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";

import Filters from "../_components/Filters";
import BrandsFilter from "../_components/BrandsFilter";
import FilterTopBar from "../_components/FilterTopBar";
import ProductsGrid from "../_components/ProductsGrid";
import ProductsLoading from "../_components/ProductsLoading";
import BreadcrumbBar from "@/components/global/shared/Breadcrumb";

type TProps = {
  params: Promise<{
    category: string;
  }>;
  searchParams: any;
};

export async function generateMetadata(
  { params }: TProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category } = await params;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Shop - ${category}`,
    openGraph: {
      images: [...previousImages],
    },
  };
}

const ShopPage = async (props: TProps) => {
  const searchParams = await props.searchParams;
  const params = new URLSearchParams(searchParams);

  const category = (await props.params).category;

  const breadcrumbItems = [
    {
      label: category as string,
      link: null,
    },
  ];

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

          <Suspense
            key={`${params.toString()}-${Math.random()}`}
            fallback={<ProductsLoading />}
          >
            <ProductsGrid searchParams={searchParams} category={category} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
