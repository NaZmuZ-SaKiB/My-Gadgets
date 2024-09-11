import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import { productGetAllAction } from "@/lib/actions/product.action";
import Filters from "../_components/Filters";
import FilterTopBar from "../_components/FilterTopBar";
import ProductCard from "@/components/global/cards/ProductCard";
import { TProduct } from "@/types/product.type";
import BrandsFilter from "../_components/BrandsFilter";
import { brandGetAllAction } from "@/lib/actions/brand.action";
import { TBrand } from "@/types/brand.type";

type TProps = {
  params: {
    category: string;
  };
  searchParams: any;
};

const ShopPage = async ({ params, searchParams }: TProps) => {
  const limit = searchParams?.limit ?? 35;
  if (searchParams?.limit) delete searchParams.limit;

  const queries = new URLSearchParams(searchParams);

  const productsData = await productGetAllAction(
    `limit=${limit}&category=${params.category}&${queries.toString()}`
  );
  const products: TProduct[] = productsData.data || [];

  const brandsData = await brandGetAllAction(
    "limit=100&sortBy=name&sortOrder=asc"
  );
  const brands: TBrand[] = brandsData.data || [];

  const breadcrumbItems = [
    {
      label: params.category as string,
      link: "",
    },
  ];

  return (
    <div className="mg-container py-4">
      <BreadcrumbBar items={breadcrumbItems} />

      <BrandsFilter brands={brands} />

      <div className="lg:grid grid-cols-[250px_1fr] gap-3 mt-3">
        <div className="bg-white max-lg:hidden">
          <Filters />
        </div>
        <div>
          <FilterTopBar />

          <div className="mt-3 mg-shop-grid">
            {products.map((product) => (
              <div key={`shop-product-${product._id}`} className="">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
