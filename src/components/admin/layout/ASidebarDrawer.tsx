"use client";

import { useState } from "react";
import { AlignJustify } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ASidebar from "./ASidebar";

const ASidebarDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="cursor-pointer rounded p-0.5 hover:bg-slate-700 lg:hidden">
        <AlignJustify className="size-7 text-slate-50" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[220px] border-none bg-slate-800 px-0 py-0"
      >
        <SheetTitle className="hidden">Menu</SheetTitle>
        <ASidebar />
      </SheetContent>
    </Sheet>
  );
};

export default ASidebarDrawer;
