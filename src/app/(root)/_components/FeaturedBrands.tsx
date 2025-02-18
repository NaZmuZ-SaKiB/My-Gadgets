import Image from "next/image";

import { TBrand } from "@/types/brand.type";

type TProps = {
  brands: TBrand[];
};

const FeaturedBrands = ({ brands }: TProps) => {
  return (
    <section className="mt-5">
      <h2 className="text-2xl font-bold text-slate-700 md:text-3xl">
        Featured Brands
      </h2>
      {/* @ts-ignore */}
      <marquee scrollamount="10">
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
