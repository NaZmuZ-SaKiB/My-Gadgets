type TProps = {
  description: string;
};

const ProductDescription = ({ description }: TProps) => {
  return (
    <section
      className="mt-4 rounded-2xl bg-slate-50 p-2 xs:p-6"
      id="description"
    >
      <h2 className="text-xl font-semibold text-slate-700">Description</h2>

      <div
        className="product-description mt-4"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </section>
  );
};

export default ProductDescription;
