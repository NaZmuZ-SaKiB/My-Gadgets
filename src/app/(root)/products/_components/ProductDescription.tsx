type TProps = {
  description: string;
};

const ProductDescription = ({ description }: TProps) => {
  return (
    <section className="mt-4 p-2 xs:p-6 bg-gray-50 rounded-2xl">
      <h2 className="text-xl text-slate-700 font-semibold">Description</h2>

      <div
        className="mt-4 product-description"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </section>
  );
};

export default ProductDescription;
