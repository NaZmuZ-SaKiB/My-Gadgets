"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import ASidebar from "./ASidebar";

const ASidebarDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="hover:bg-slate-700 p-0.5 rounded cursor-pointer lg:hidden
      "
      >
        <AlignJustify className="size-7 text-slate-50" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="bg-slate-800 w-[220px] px-0 py-0 border-none"
      >
        <ASidebar />
      </SheetContent>
    </Sheet>
  );
};

export default ASidebarDrawer;
