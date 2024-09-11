"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import Filters from "./Filters";

const FilterSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="no-focus lg:hidden">
        <Button
          variant="secondary"
          size="sm"
          className="px-1.5 text-gray-500 no-focus"
        >
          <Filter className="size-4" />
          &nbsp;Filters
        </Button>
      </SheetTrigger>

      <SheetContent
        side={"right"}
        className="p-0 pb-5 w-[min(300px,100%)] overflow-y-auto z-[110]"
      >
        <div className="p-3 flex items-center justify-between sticky top-0 bg-white z-[120]">
          <SheetClose className="no-focus border border-gray-500 rounded-full p-1">
            <X className="size-5" />
          </SheetClose>
          <div className="font-bold text-xl">Filters</div>
        </div>
        <div className="px-3">
          <Filters />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSidebar;
