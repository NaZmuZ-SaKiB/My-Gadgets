import ProductCard from "@/components/global/cards/ProductCard";
import MGPagination from "@/components/global/shared/MGPagination";

import { productGetAllAction } from "@/lib/actions/product.action";
import { TProduct } from "@/types/product.type";
import NoProducts from "./NoProducts";

type TProps = {
  searchParams: any;
  category?: string;
};

const ProductsGrid = async (props: TProps) => {
  const searchParams = props.searchParams;
  const limit = searchParams?.limit ?? 35;
  if (searchParams?.limit) delete searchParams.limit;

  const queries = new URLSearchParams(searchParams);

  if (props.category) queries.append("category", props.category);

  const productsData = await productGetAllAction(
    `limit=${limit}&${queries.toString()}`,
  );
  const products: TProduct[] = productsData.data || [];
  return (
    <>
      <div className="mg-shop-grid mt-3">
        {products.map((product) => (
          <div key={`shop-product-${product._id}`} className="">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {products.length === 0 && <NoProducts />}
      {productsData?.meta?.limit <= productsData?.meta?.total && (
        <div className="mt-5">
          <MGPagination
            limit={productsData?.meta?.limit as number}
            page={productsData?.meta?.page as number}
            total={productsData?.meta?.total as number}
          />
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
