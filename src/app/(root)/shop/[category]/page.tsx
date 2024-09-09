import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import { productGetAllAction } from "@/lib/actions/product.action";
import Filters from "../_components/Filters";

type TProps = {
  params: {
    category: string;
  };
  searchParams: any;
};

const ShopPage = async ({ params, searchParams }: TProps) => {
  const productsData = await productGetAllAction(
    `limit=30&category=${params.category}&${searchParams.toString()}`
  );
  const products = productsData.data || [];

  const breadcrumbItems = [
    {
      label: params.category as string,
      link: "",
    },
  ];

  return (
    <div className="mg-container py-4">
      <BreadcrumbBar items={breadcrumbItems} />

      <div className="lg:grid grid-cols-[250px_1fr] gap-3 mt-5">
        <div className="bg-white max-lg:hidden">
          <Filters />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
