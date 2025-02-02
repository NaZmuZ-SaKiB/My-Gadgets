import { TProduct } from "@/types/product.type";

type TProps = {
  product: TProduct;
};

const ProductSpecification = ({ product }: TProps) => {
  return (
    <section
      className="mt-4 rounded-2xl bg-slate-50 p-2 xs:p-6"
      id="specification"
    >
      <h2 className="text-xl font-semibold text-slate-700">Specification</h2>

      <div
        className="specification-table mt-4"
        dangerouslySetInnerHTML={{
          __html: product.specifications,
        }}
      />
    </section>
  );
};

export default ProductSpecification;
