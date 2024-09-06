import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import { productGetByIdAction } from "@/lib/actions/product.action";
import { TProduct } from "@/types/product.type";
import ProductImages from "../../_components/ProductImages";
import ProductShortSpec from "../../_components/ProductShortSpec";
import ProductDetailsMunu from "../../_components/ProductDetailsMunu";
import ProductSpecification from "../../_components/ProductSpecification";
import ProductDescription from "../../_components/ProductDescription";

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

      <section className="py-4">
        <div className="grid md:grid-cols-[40%_1fr] gap-8">
          <ProductImages
            name={product.name}
            images={product.images}
            alt={product.model}
          />
          <ProductShortSpec product={product} />
        </div>
      </section>

      {/* Product Details */}
      <div className="grid grid-cols-3 gap-3 mt-8">
        <div className="col-span-3 lg:col-span-2">
          <ProductDetailsMunu />
          <ProductSpecification product={product} />
          <ProductDescription description={product.description} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
