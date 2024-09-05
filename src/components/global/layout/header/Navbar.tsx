import { categoryGetAllWithSubCatsAction } from "@/lib/actions/category.action";
import { TCategory } from "@/types/category.type";
import { AlignJustify, ChevronDown } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MGButton from "../../shared/MGButton";

const Navbar = async () => {
  const categoriesData = await categoryGetAllWithSubCatsAction();
  const categories: TCategory[] = categoriesData?.data;
  const showOnTopCategories: TCategory[] = [];

  categories.forEach((cat) => {
    if (cat.showOnTopMenu) showOnTopCategories.push(cat);

    (cat.subCategories as TCategory[]).forEach((subCat) => {
      if (subCat.showOnTopMenu) showOnTopCategories.push(subCat);
    });
  });

  showOnTopCategories.sort((a, b) => {
    if (a.subCategories.length > 0) return -1;
    if (a.subCategories.length === 0) return 1;
    return 0;
  });

  return (
    <div className="bg-white drop-shadow max-xl:hidden sticky top-0 z-50">
      <div className="mg-container flex gap-3">
        <div className="py-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MGButton className="rounded h-auto gap-5 items-center px-5 py-1.5">
                <AlignJustify /> All Category
              </MGButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="min-w-[180px] rounded p-0"
              side="bottom"
              align="start"
            >
              {categories.map((cat) => {
                const hasSub = cat.subCategories.length > 0;

                return hasSub ? (
                  <DropdownMenuSub key={`${cat._id}`}>
                    <DropdownMenuSubTrigger className="py-0">
                      <Link
                        className="w-full py-1.5"
                        href={`/shop/${cat.name}`}
                      >
                        {cat.label}
                      </Link>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="p-0 rounded">
                        {(cat.subCategories as TCategory[]).map((subCat) => (
                          <DropdownMenuItem
                            key={`${subCat._id}`}
                            className="py-0"
                          >
                            <Link
                              className="w-full py-1.5"
                              href={`/shop/${subCat.name}`}
                            >
                              {subCat.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem key={`${cat._id}`}>
                    <Link className="w-full" href={`/shop/${cat.name}`}>
                      {cat.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-start items-center">
          {showOnTopCategories.map((cat) => {
            const hasSubCat = cat.subCategories.length > 0;
            return (
              <div key={`${cat._id}`} className="relative">
                <Link
                  href={`/shop/${cat.name}`}
                  className="block px-3 py-2 rounded cursor-pointer hover:bg-primary-hover hover:text-white peer"
                >
                  <span className="flex gap-1 items-center text-sm">
                    {cat.label}{" "}
                    {hasSubCat && <ChevronDown className="size-4" />}
                  </span>
                </Link>
                {hasSubCat && (
                  <div className="flex-col w-[150px] rounded-md border shadow bg-white z-10 absolute top-full hidden peer-hover:flex hover:flex">
                    {(cat.subCategories as TCategory[]).map((subCat) => {
                      return (
                        <Link
                          href={`/shop/${subCat.name}`}
                          key={`${subCat._id}`}
                          className="p-2 hover:bg-slate-100 text-sm cursor-pointer"
                        >
                          {subCat.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
