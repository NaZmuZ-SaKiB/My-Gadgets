import MGButton from "@/components/global/shared/MGButton";

const ProductDetailsMunu = () => {
  return (
    <div className="space-x-3">
      <MGButton variant="outline" className="rounded-3xl">
        Specification
      </MGButton>

      <MGButton variant="outline" className="rounded-3xl">
        Description
      </MGButton>

      <MGButton variant="outline" className="rounded-3xl">
        Reviews
      </MGButton>
    </div>
  );
};

export default ProductDetailsMunu;
