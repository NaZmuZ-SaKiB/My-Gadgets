import Link from "next/link";
import { Plus } from "lucide-react";

import ProductsData from "./_components/ProductsData";
import MGButton from "@/components/global/shared/MGButton";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

const ProductsPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Products">
        <Link href={"/admin/products/add-product"}>
          <MGButton className="h-auto self-start rounded-none px-5 py-2">
            <Plus className="mr-2" /> Add Product
          </MGButton>
        </Link>
      </APageHeading>
      <ProductsData />
    </APageContainer>
  );
};

export default ProductsPage;
