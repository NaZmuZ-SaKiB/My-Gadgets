"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Edit2, Edit3 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProductEditDropDown = () => {
  const params = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="no-focus flex cursor-pointer items-center gap-2 px-3 py-1.5 text-slate-50 hover:bg-slate-500">
        <Edit className="size-4" />
        <span>Edit Product</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-slate-700 !p-0">
        <DropdownMenuItem className="!p-0 hover:!bg-slate-600">
          <Link
            href="/admin"
            className="flex w-full items-center gap-2 px-3 py-1.5 text-slate-50"
          >
            <Edit2 className="size-4" />
            <span>Quick Edit</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="!p-0 hover:!bg-slate-600">
          <Link
            href={`/admin/products/${params?.id}`}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-slate-50"
          >
            <Edit3 className="size-4" />
            <span>Full Edit</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductEditDropDown;
