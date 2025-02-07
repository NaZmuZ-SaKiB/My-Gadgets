"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { TBrand } from "@/types/brand.type";
import { useBrandGetAllQuery } from "@/lib/queries/brand.query";

const BrandsFilter = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { data: brandsData, isLoading } = useBrandGetAllQuery(
    "limit=100&sortBy=name&sortOrder=asc",
  );
  const brands: TBrand[] = brandsData?.data || [];

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

  if (isLoading) {
    return (
      <div className="mt-3 h-14 animate-pulse rounded-xl bg-slate-100"></div>
    );
  }

  return (
    <div className="no-scrollbar mt-3 flex justify-start gap-2 overflow-y-auto">
      <div
        className={cn(
          "grid shrink-0 cursor-pointer place-items-center rounded-md border px-4 py-1.5",
          {
            "border-primary": !searchParams.get("brand"),
          },
        )}
        onClick={() => handleChange("all")}
      >
        <span className="text-xs font-semibold text-slate-700">All Brands</span>
      </div>

      {brands.map((brand) => (
        <div
          key={`${brand._id}`}
          className={cn(
            "grid shrink-0 cursor-pointer place-items-center rounded-md border px-4 py-1.5",
            {
              "border-primary": searchParams.get("brand") === brand.name,
            },
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
