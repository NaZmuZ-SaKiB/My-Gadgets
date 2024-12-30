import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import { productGetByIdAction } from "@/lib/actions/product.action";
import { TProduct } from "@/types/product.type";
import ProductImages from "../../_components/ProductImages";
import ProductShortSpec from "../../_components/ProductShortSpec";
import ProductDetailsMunu from "../../_components/ProductDetailsMunu";
import ProductSpecification from "../../_components/ProductSpecification";
import ProductDescription from "../../_components/ProductDescription";
import RelatedProducts from "../../_components/RelatedProducts";
import ReviewCreateForm from "../../_components/ReviewCreateForm";
import ProductReviews from "../../_components/ProductReviews";
import { reviewGetAllByProductIdAction } from "@/lib/actions/review.action";
import { TReview } from "@/types/review.type";
import { isUserLoggedIn } from "@/lib/actions/auth.action";

type TProps = {
  params: Promise<{ id: string }>;
};

const SingleProductPage = async (props: TProps) => {
  const params = await props.params;
  const { id } = params;

  const user = await isUserLoggedIn();

  const productData = await productGetByIdAction(id);
  const product: TProduct = productData.data;

  const reviewsData = await reviewGetAllByProductIdAction(id);
  const reviews: TReview[] = reviewsData.data;

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
          <ProductShortSpec product={product} reviews={reviews} />
        </div>
      </section>

      {/* Product Details */}
      <div className="grid grid-cols-3 gap-3 mt-8">
        <div className="col-span-3 lg:col-span-2">
          <ProductDetailsMunu />
          <ProductSpecification product={product} />
          <ProductDescription description={product.description} />

          <ProductReviews reviews={reviews} />

          {!!user && (
            <div className="border border-slate-300 rounded-2xl p-3 xs:p-6 my-4 max-lg:mb-0">
              <div className="text-xl font-bold mb-3">Leave a review</div>
              <ReviewCreateForm product={product._id.toString()} />
            </div>
          )}
        </div>
        <RelatedProducts category={product.categories[0].name} />
      </div>
    </div>
  );
};

export default SingleProductPage;
