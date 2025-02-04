import { Metadata, ResolvingMetadata } from "next";
import { unstable_cache as cache } from "next/cache";

import ProductImages from "../../_components/ProductImages";
import ProductReviews from "../../_components/ProductReviews";
import RelatedProducts from "../../_components/RelatedProducts";
import ProductShortSpec from "../../_components/ProductShortSpec";
import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import ReviewCreateForm from "../../_components/ReviewCreateForm";
import ProductDetailsMunu from "../../_components/ProductDetailsMunu";
import ProductDescription from "../../_components/ProductDescription";
import ProductSpecification from "../../_components/ProductSpecification";

import { reviewGetAllByProductIdAction } from "@/lib/actions/review.action";
import { productGetByIdAction } from "@/lib/actions/product.action";
import { isUserLoggedIn } from "@/lib/actions/auth.action";
import { TProduct } from "@/types/product.type";
import { TReview } from "@/types/review.type";

type TProps = {
  params: Promise<{ id: string }>;
};

const getCachedProduct = (id: string) =>
  cache(
    async () => {
      return productGetByIdAction(id);
    },
    [`product-${id}`], // Base cache key
    { tags: [`product-${id}`] }, // Revalidation tag
  );

const getCachedReviews = (productId: string) =>
  cache(
    async () => {
      return reviewGetAllByProductIdAction(productId);
    },
    [`reviews-${productId}`], // Base cache key
    { tags: [`reviews-${productId}`] }, // Revalidation tag
  );

export async function generateMetadata(
  { params }: TProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;

  const productData = await getCachedProduct(id)();
  const product: TProduct = productData.data;

  const previousImages = (await parent).openGraph?.images || [];
  const newImages = product.images.map((image) => ({
    url: image.secureUrl,
    alt: product.name,
  }));

  return {
    title: product.name,
    openGraph: {
      images: [...newImages, ...previousImages],
    },
  };
}

const SingleProductPage = async (props: TProps) => {
  const params = await props.params;
  const { id } = params;

  const user = await isUserLoggedIn();

  const productData = await getCachedProduct(id)();
  const product: TProduct = productData.data;

  const reviewsData = await getCachedReviews(id)();
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
      link: null,
    },
  ];

  return (
    <div className="mg-container p-4">
      <BreadcrumbBar items={breadcrumbItems} />

      <section className="py-4">
        <div className="grid gap-8 md:grid-cols-[40%_1fr]">
          <ProductImages
            name={product.name}
            images={product.images}
            alt={product.model}
          />
          <ProductShortSpec product={product} reviews={reviews} />
        </div>
      </section>

      {/* Product Details */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        <div className="col-span-3 lg:col-span-2">
          <ProductDetailsMunu />
          <ProductSpecification product={product} />
          <ProductDescription description={product.description} />

          <ProductReviews reviews={reviews} />

          {!!user && (
            <div className="my-4 rounded-2xl border border-slate-300 p-3 max-lg:mb-0 xs:p-6">
              <div className="mb-3 text-xl font-bold">Leave a review</div>
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
