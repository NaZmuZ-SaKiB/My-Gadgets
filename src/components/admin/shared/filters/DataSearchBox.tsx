"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import MGButton from "@/components/global/shared/MGButton";

const DataSearchBox = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const [search, setSearch] = useState<string>(params.get("searchTerm") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (!e.target.value) {
      params.delete("searchTerm");
      params.delete("page");
      params.append("page", "1");

      router.replace(`${pathName}?${params}`);
    }
  };

  const handleSearch = () => {
    if (!search || search === params.get("searchTerm")) return;

    params.delete("searchTerm");
    params.delete("page");
    params.append("page", "1");
    params.append("searchTerm", search);

    router.replace(`${pathName}?${params}`);
  };

  const handleClearSearch = () => {
    setSearch("");

    params.delete("searchTerm");
    params.delete("page");
    params.append("page", "1");

    router.replace(`${pathName}?${params}`);
  };

  useEffect(() => {
    setSearch(params.get("searchTerm") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-wrap gap-2">
      <div className="relative flex-1 shrink-0 basis-60">
        <Input
          value={search}
          placeholder="Search..."
          className="no-focus w-full pr-8 focus-visible:border-primary"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <X
          className="absolute right-2 top-2.5 size-5 cursor-pointer text-slate-500"
          onClick={handleClearSearch}
        />
      </div>
      <MGButton
        variant="outline"
        className="h-auto rounded px-10"
        onClick={handleSearch}
      >
        Search
      </MGButton>
    </div>
  );
};

export default DataSearchBox;
