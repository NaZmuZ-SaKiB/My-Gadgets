import { TBrand } from "@/types/brand.type";
import Image from "next/image";

type TProps = {
  brands: TBrand[];
};

const FeaturedBrands = ({ brands }: TProps) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-700 md:text-3xl">
        Featured Brands
      </h2>
      {/* @ts-ignore */}
      <marquee>
        <div className="flex items-center gap-10 sm:gap-20">
          {brands.map((brand) => (
            <Image
              key={`featured-brand-${brand._id}`}
              src={brand.image?.secureUrl || ""}
              alt={brand.name}
              width={150}
              height={150}
              className="size-[150px] object-contain"
            />
          ))}
        </div>
        {/* @ts-ignore */}
      </marquee>
    </section>
  );
};

export default FeaturedBrands;
