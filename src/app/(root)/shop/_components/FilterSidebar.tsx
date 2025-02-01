"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";

import Filters from "./Filters";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const FilterSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="no-focus lg:hidden">
        <Button
          variant="secondary"
          size="sm"
          className="no-focus px-1.5 text-gray-500"
        >
          <Filter className="size-4" />
          &nbsp;Filters
        </Button>
      </SheetTrigger>

      <SheetContent
        side={"right"}
        className="z-[110] w-[min(300px,100%)] overflow-y-auto p-0 pb-5"
      >
        <div className="sticky top-0 z-[120] flex items-center justify-between bg-white p-3">
          <SheetClose className="no-focus rounded-full border border-gray-500 p-1">
            <X className="size-5" />
          </SheetClose>
          <div className="text-xl font-bold">Filters</div>
        </div>
        <div className="px-3">
          <Filters />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSidebar;
