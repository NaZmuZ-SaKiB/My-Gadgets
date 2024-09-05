import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import { productGetByIdAction } from "@/lib/actions/product.action";
import { TProduct } from "@/types/product.type";

type TProps = {
  params: { id: string };
};

const SingleProductPage = async ({ params }: TProps) => {
  const { id } = params;
  const productData = await productGetByIdAction(id);
  const product: TProduct = productData.data;

  const breadcrumbItems = [
    {
      label: product.categories[0].label,
      link: `/shop/${product.categories[0].name}`,
    },
    {
      label: product.brand.name,
      link: `/shop/${product.categories[0].name}?brand=${product.brand.name}`,
    },
    {
      label: product.name,
      link: "",
    },
  ];

  return (
    <div className="mg-container p-4">
      <BreadcrumbBar items={breadcrumbItems} />
    </div>
  );
};

export default SingleProductPage;
