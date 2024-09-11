"use client";

import { cn } from "@/lib/utils";
import { TBrand } from "@/types/brand.type";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TProps = {
  brands: TBrand[];
};

const BrandsFilter = ({ brands }: TProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.delete("brand");

    params.append("page", "1");
    if (value !== "all") {
      params.append("brand", value);
    }

    router.replace(`${pathName}?${params}`);
  };

  return (
    <div className="mt-3 flex justify-center gap-2 overflow-y-auto">
      <div
        className={cn(
          "px-4 py-1.5 border cursor-pointer rounded-md grid place-items-center",
          {
            "border-primary": !searchParams.get("brand"),
          }
        )}
        onClick={() => handleChange("all")}
      >
        <span className="text-xs font-semibold text-slate-700">All Brands</span>
      </div>

      {brands.map((brand) => (
        <div
          key={`${brand._id}`}
          className={cn(
            "px-4 py-1.5 border cursor-pointer rounded-md grid place-items-center",
            {
              "border-2 border-primary":
                searchParams.get("brand") === brand.name,
            }
          )}
          onClick={() => handleChange(brand.name)}
        >
          {brand.image ? (
            <Image
              src={brand.image?.secureUrl}
              alt={brand.name}
              width={40}
              height={40}
              className="object-contain"
            />
          ) : (
            <span className="text-xs font-semibold text-slate-700">
              {brand.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BrandsFilter;
