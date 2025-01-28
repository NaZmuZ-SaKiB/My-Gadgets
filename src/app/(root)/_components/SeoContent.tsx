type TProps = {
  description: string;
};

const SeoContent = ({ description }: TProps) => {
  return (
    <div className="mb-5 md:mt-5">
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
        className="home-seo-content"
      />
    </div>
  );
};

export default SeoContent;
