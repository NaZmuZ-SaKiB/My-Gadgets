import { TProduct } from "@/types/product.type";

type TProps = {
  product: TProduct;
};

const ProductSpecification = ({ product }: TProps) => {
  return (
    <section className="mt-4 p-2 xs:p-6 bg-slate-50 rounded-2xl">
      <h2 className="text-xl text-slate-700 font-semibold">Specification</h2>

      <div
        className="mt-4 specification-table"
        dangerouslySetInnerHTML={{
          __html: product.specifications,
        }}
      />
    </section>
  );
};

export default ProductSpecification;
