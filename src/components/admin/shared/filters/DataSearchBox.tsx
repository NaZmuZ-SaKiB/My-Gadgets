"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import MGButton from "@/components/global/shared/MGButton";

const DataSearchBox = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const [search, setSearch] = useState<string>(params.get("searchTerm") || "");

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
    <div className="w-full flex gap-2 flex-wrap">
      <div className="shrink-0 flex-1 basis-60 relative">
        <Input
          value={search}
          placeholder="Search..."
          className=" w-full pr-8 focus-visible:border-primary no-focus"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <X
          className="size-5 absolute right-2 top-2.5 text-gray-500 cursor-pointer"
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
