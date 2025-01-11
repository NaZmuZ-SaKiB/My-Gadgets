"use client";

import { USER_ROLE } from "@/constants";
import { useIsUserLoggedInQuery } from "@/lib/queries/auth.query";
import { LayoutDashboard, Plus, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import ProductDeleteDialog from "../../shared/ProductDeleteDialog";
import ProductEditDropDown from "./ProductEditDropDown";

const AdminTopbar = () => {
  const pathName = usePathname();
  const params = useParams();

  const { data: user, isLoading } = useIsUserLoggedInQuery();

  if (isLoading) return null;

  if (!user) return null;
  if (user.role !== USER_ROLE.ADMIN && user.role !== USER_ROLE.SUPER_ADMIN)
    return null;

  return (
    <div className="mg-container bg-slate-700 text-sm max-xl:hidden">
      <div className="flex">
        <Link
          href="/admin"
          className="flex items-center gap-1 px-3 py-1.5 text-slate-50 hover:bg-slate-600"
        >
          <LayoutDashboard fill="#f8fafc" className="size-4" />
          <span>Admin Dashboard</span>
        </Link>

        <Link
          href="/admin/settings/homepage"
          className="flex items-center gap-1 px-3 py-1.5 text-slate-50 hover:bg-slate-600"
        >
          <Settings className="size-4" />
          <span>Settings</span>
        </Link>

        {pathName.includes("/products/") && (
          <>
            <Link
              href="/admin/products/add-product"
              className="flex items-center gap-1 px-3 py-1.5 text-slate-50 hover:bg-slate-600"
            >
              <Plus className="size-4" />
              <span>Add Product</span>
            </Link>

            <ProductEditDropDown />

            <ProductDeleteDialog products={[`${params?._id}`]}>
              <div className="flex cursor-pointer items-center gap-1 px-3 py-1.5 text-slate-50 hover:bg-slate-600">
                <Trash2 className="size-4" />
                <span>Delete</span>
              </div>
            </ProductDeleteDialog>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTopbar;
