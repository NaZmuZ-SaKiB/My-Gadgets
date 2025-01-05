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
    <div className="sticky top-0 z-50 bg-white drop-shadow max-xl:hidden">
      <div className="mg-container flex gap-3">
        <div className="py-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MGButton className="h-auto items-center gap-5 rounded px-5 py-1.5">
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
                        className="w-full py-1.5 capitalize"
                        href={`/shop/${cat.name}`}
                      >
                        {cat.label}
                      </Link>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="rounded p-0">
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

        <div className="flex items-center justify-start">
          {showOnTopCategories.map((cat) => {
            const hasSubCat = cat.subCategories.length > 0;
            return (
              <div key={`${cat._id}`} className="relative">
                <Link
                  href={`/shop/${cat.name}`}
                  className="peer block cursor-pointer rounded px-3 py-2 hover:bg-primary-hover hover:text-white"
                >
                  <span className="flex items-center gap-1 text-sm">
                    {cat.label}{" "}
                    {hasSubCat && <ChevronDown className="size-4" />}
                  </span>
                </Link>
                {hasSubCat && (
                  <div className="absolute top-full z-10 hidden w-[150px] flex-col rounded-md border bg-white shadow hover:flex peer-hover:flex">
                    {(cat.subCategories as TCategory[]).map((subCat) => {
                      return (
                        <Link
                          href={`/shop/${subCat.name}`}
                          key={`${subCat._id}`}
                          className="cursor-pointer p-2 text-sm hover:bg-slate-100"
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
