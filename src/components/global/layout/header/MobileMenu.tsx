"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCategoryGetAllWithSubCatQuery } from "@/lib/queries/category.query";
import { TCategory } from "@/types/category.type";
import { useState } from "react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useCategoryGetAllWithSubCatQuery();
  const categories: TCategory[] = data?.data || [];

  if (isLoading) return <div></div>;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="no-focus">
        <div className={`nav-toggle-btn ${open ? "active" : ""}`}>
          <span></span>
        </div>
      </SheetTrigger>

      <SheetContent
        side={"left"}
        className="p-0 pb-20 w-[min(300px,100%)] top-[53px] overflow-y-auto"
      >
        <Accordion type="single" collapsible className="w-full">
          {categories.map((category: TCategory) => (
            <AccordionItem
              key={`${category._id}`}
              value={category.name}
              className="border-none p-0"
            >
              <div className="flex justify-between items-center border-b border-t -mt-[1px] border-gray-300">
                <span className="px-3">{category.label}</span>
                <AccordionTrigger className="p-3 border-l border-gray-300 no-focus"></AccordionTrigger>
              </div>

              <AccordionContent className="pb-0 ps-4">
                {(category?.subCategories as TCategory[])?.map(
                  (subCategory) => (
                    <div
                      key={`${subCategory._id}`}
                      className="w-full py-1.5 px-3 text-base border-l border-b border-gray-300"
                    >
                      {subCategory.label}
                    </div>
                  )
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
