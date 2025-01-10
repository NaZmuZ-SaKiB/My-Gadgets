"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import { Button } from "@/components/ui/button";
import { useCategoryGetAllQuery } from "@/lib/queries/category.query";
import { TCategory } from "@/types/category.type";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import CategoryDeleteDialog from "./CategoryDeleteDialog";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import MGPagination from "@/components/global/shared/MGPagination";

type TProps = {
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
};

const CategoriesTable = ({
  selectedCategories,
  setSelectedCategories,
}: TProps) => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useCategoryGetAllQuery(searchParams.toString());

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCategories(data?.data?.map((item: any) => item._id) || []);
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, id]);
    } else {
      setSelectedCategories(selectedCategories.filter((item) => item !== id));
    }
  };
  // End Handle Select

  if (isLoading) {
    return (
      <AFloatingBox className="grid flex-1 place-items-center">
        <Loader2 className="mx-auto size-[50px] animate-spin text-primary-hover" />
      </AFloatingBox>
    );
  }

  return (
    <AFloatingBox className="overflow-x-auto">
      <table className="admin-table min-w-[600px] table-auto">
        <thead className="text-left">
          <tr>
            <th>
              <span className="inline-flex rounded bg-white p-[2px]">
                <input
                  type="checkbox"
                  onChange={selectAll}
                  className="no-focus size-3.5"
                />
              </span>
            </th>
            <th>Name</th>
            <th>Label</th>
            <th>Parent</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((item: TCategory) => (
            <tr key={`${item._id}`}>
              <td>
                <input
                  checked={selectedCategories.includes(item._id)}
                  type="checkbox"
                  onChange={(e) => handleSelect(e, item._id)}
                  className="no-focus size-4"
                />
              </td>

              <td>{item.name}</td>
              <td>{item.label || item.name}</td>
              <td>{(item?.parent as TCategory)?.name || "N/A"}</td>
              <td>
                <div className="flex justify-end gap-1">
                  <Link href={`/shop/${item.name}`} className="no-focus">
                    <Button
                      size="icon"
                      variant="outline"
                      className="no-focus group h-8 border-slate-300 bg-transparent hover:border-slate-600 hover:bg-slate-600"
                    >
                      <Eye className="size-4 text-slate-700 group-hover:text-white" />
                    </Button>
                  </Link>

                  <Link
                    href={`/admin/categories/${item._id}`}
                    className="no-focus"
                  >
                    <Button
                      size="icon"
                      className="no-focus group h-8 border border-green-300 bg-transparent text-green-500 hover:border-green-500 hover:bg-green-500"
                    >
                      <Edit className="size-4 group-hover:text-white" />
                    </Button>
                  </Link>

                  <CategoryDeleteDialog categories={[`${item._id}`]}>
                    <Button
                      size="icon"
                      className="no-focus group h-8 border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-500"
                    >
                      <Trash2 className="size-4 group-hover:text-white" />
                    </Button>
                  </CategoryDeleteDialog>
                </div>
              </td>
            </tr>
          ))}

          {data?.data?.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-xl">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-5 flex items-center justify-center gap-3 sm:justify-between">
        <div className="max-sm:hidden">
          <DataLimitSelect />
        </div>
        <MGPagination
          admin
          limit={data?.meta?.limit as number}
          page={data?.meta?.page as number}
          total={data?.meta?.total as number}
        />
      </div>
    </AFloatingBox>
  );
};

export default CategoriesTable;
