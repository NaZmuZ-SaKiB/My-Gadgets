import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import ProductsData from "./_components/ProductsData";

const ProductsPage = () => {
  return (
    <APageContainer>
      <APageHeading title="Products" />
      <ProductsData />
    </APageContainer>
  );
};

export default ProductsPage;
