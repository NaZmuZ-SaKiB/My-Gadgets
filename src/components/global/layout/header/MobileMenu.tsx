"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCategoryGetAllWithSubCatQuery } from "@/lib/queries/category.query";
import { TCategory } from "@/types/category.type";
import { useState } from "react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useCategoryGetAllWithSubCatQuery();
  const categories: TCategory[] = data?.data || [];

  if (isLoading)
    return (
      <div className={`nav-toggle-btn ${open ? "active" : ""}`}>
        <span></span>
      </div>
    );
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="no-focus xl:hidden">
        <div className={`nav-toggle-btn ${open ? "active" : ""}`}>
          <span></span>
        </div>
      </SheetTrigger>

      <SheetContent
        side={"left"}
        className="top-[53px] w-[min(300px,100%)] overflow-y-auto p-0 pb-20"
      >
        <SheetTitle className="hidden">menu</SheetTitle>
        <Accordion type="single" collapsible className="w-full">
          {categories.map((category: TCategory) => (
            <AccordionItem
              key={`${category._id}`}
              value={category.name}
              className="border-none p-0"
            >
              <div className="-mt-[1px] flex items-center justify-between border-b border-t border-slate-300">
                <span className="px-3 capitalize">{category.label}</span>
                <AccordionTrigger className="no-focus border-l border-slate-300 p-3"></AccordionTrigger>
              </div>

              <AccordionContent className="pb-0 ps-4">
                {(category?.subCategories as TCategory[])?.map(
                  (subCategory) => (
                    <div
                      key={`${subCategory._id}`}
                      className="w-full border-b border-l border-slate-300 px-3 py-1.5 text-base capitalize"
                    >
                      {subCategory.label}
                    </div>
                  ),
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
