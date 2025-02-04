"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { useProductGetAllQuery } from "@/lib/queries/product.query";

import { formatCurrency } from "@/utils/currencyFormat";
import { TProduct } from "@/types/product.type";
import { images } from "@/constants";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useProductGetAllQuery(`limit=6&searchTerm=${debouncedSearch}`);
  const products: TProduct[] = productData?.data || [];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <div className="xl:search-box-pc search-box max-xl:search-box-mobile relative z-50 bg-white">
      <input
        className="flex-1 focus:outline-none"
        type="text"
        autoComplete="off"
        value={searchTerm}
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      <button className="flex shrink-0 items-center justify-center">
        <Search className="h-6 text-primary" />
      </button>

      <div
        className={cn(
          "absolute left-0 top-[calc(100%+2px)] z-50 w-full border border-slate-200 bg-white",
          {
            hidden: !debouncedSearch || !open,
          },
        )}
      >
        <ScrollArea className="max-h-[250px] w-full overflow-y-auto">
          {isLoading || isFetching ? (
            <div className="grid h-[100px] flex-1 place-items-center">
              <Loader2 className="mx-auto size-[40px] animate-spin text-primary-hover" />
            </div>
          ) : (
            <>
              {products.slice(0, 5).map((product) => (
                <div
                  key={`search-box-${product._id}`}
                  className="cursor-pointer hover:bg-slate-100"
                  onMouseDown={() =>
                    router.push(`/products/${product.slug}/${product._id}`)
                  }
                >
                  <div className="flex items-center gap-2 p-3">
                    <Image
                      src={product.images[0]?.secureUrl || images.defaultImage}
                      width={50}
                      height={50}
                      className="object-contain"
                      alt={product.name}
                    />

                    <div className="flex h-full flex-col justify-between">
                      <span className="text-sm">{product.name}</span>

                      <span className="font-semibold text-primary">
                        {formatCurrency(product.salePrice)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {
                <div
                  className="cursor-pointer p-2 text-center text-sm font-semibold text-primary hover:bg-slate-100 hover:text-primary-hover"
                  onMouseDown={() =>
                    router.replace(`/shop/search?searchTerm=${debouncedSearch}`)
                  }
                >
                  Show all results
                </div>
              }
            </>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default SearchBox;
