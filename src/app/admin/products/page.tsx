import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import ProductsData from "./_components/ProductsData";
import Link from "next/link";
import MGButton from "@/components/global/shared/MGButton";
import { Plus } from "lucide-react";

const ProductsPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Products">
        <Link href={"/admin/products/add-product"}>
          <MGButton className="rounded-none self-start px-5 py-2 h-auto">
            <Plus className="mr-2" /> Add Product
          </MGButton>
        </Link>
      </APageHeading>
      <ProductsData />
    </APageContainer>
  );
};

export default ProductsPage;
