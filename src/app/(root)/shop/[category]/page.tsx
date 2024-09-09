import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import { productGetAllAction } from "@/lib/actions/product.action";
import Filters from "../_components/Filters";
import FilterTopBar from "../_components/FilterTopBar";
import ProductCard from "@/components/global/cards/ProductCard";
import { TProduct } from "@/types/product.type";

type TProps = {
  params: {
    category: string;
  };
  searchParams: any;
};

const ShopPage = async ({ params, searchParams }: TProps) => {
  const productsData = await productGetAllAction(
    `limit=35&category=${params.category}&${searchParams.toString()}`
  );
  const products: TProduct[] = productsData.data || [];

  const breadcrumbItems = [
    {
      label: params.category as string,
      link: "",
    },
  ];

  return (
    <div className="mg-container py-4">
      <BreadcrumbBar items={breadcrumbItems} />

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
