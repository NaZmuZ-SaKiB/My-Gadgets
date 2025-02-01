import { Metadata, ResolvingMetadata } from "next";

import Filters from "../_components/Filters";
import { TProduct } from "@/types/product.type";
import BrandsFilter from "../_components/BrandsFilter";
import FilterTopBar from "../_components/FilterTopBar";
import ProductCard from "@/components/global/cards/ProductCard";
import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import MGPagination from "@/components/global/shared/MGPagination";

import { TBrand } from "@/types/brand.type";
import { brandGetAllAction } from "@/lib/actions/brand.action";
import { productGetAllAction } from "@/lib/actions/product.action";

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
  const params = await props.params;
  const limit = searchParams?.limit ?? 35;
  if (searchParams?.limit) delete searchParams.limit;

  const queries = new URLSearchParams(searchParams);

  const productsData = await productGetAllAction(
    `limit=${limit}&category=${params.category}&${queries.toString()}`,
  );
  const products: TProduct[] = productsData.data || [];

  const brandsData = await brandGetAllAction(
    "limit=100&sortBy=name&sortOrder=asc",
  );
  const brands: TBrand[] = brandsData.data || [];

  const breadcrumbItems = [
    {
      label: params.category as string,
      link: null,
    },
  ];

  return (
    <div className="mg-container py-4">
      <BreadcrumbBar items={breadcrumbItems} />

      <BrandsFilter brands={brands} />

      <div className="mt-3 grid-cols-[250px_1fr] gap-3 lg:grid">
        <div className="bg-white max-lg:hidden">
          <Filters />
        </div>
        <div>
          <FilterTopBar />

          <div className="mg-shop-grid mt-3">
            {products.map((product) => (
              <div key={`shop-product-${product._id}`} className="">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {productsData?.meta?.limit <= productsData?.meta?.total && (
        <div className="mt-5">
          <MGPagination
            limit={productsData?.meta?.limit as number}
            page={productsData?.meta?.page as number}
            total={productsData?.meta?.total as number}
          />
        </div>
      )}
    </div>
  );
};

export default ShopPage;
