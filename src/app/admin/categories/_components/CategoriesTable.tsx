"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import { Button } from "@/components/ui/button";
import { useCategoryGetAllQuery } from "@/lib/queries/category.query";
import { TCategory } from "@/types/category.type";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

type TProps = {
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
};

const CategoriesTable = ({
  selectedCategories,
  setSelectedCategories,
}: TProps) => {
  const searchParams = useSearchParams();
  const { data, isLoading, isFetching, isRefetching } = useCategoryGetAllQuery(
    searchParams.toString()
  );

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

  if (isLoading || isFetching || isRefetching) {
    return (
      <AFloatingBox className="flex-1 grid place-items-center">
        <Loader2 className="animate-spin mx-auto size-[50px] text-primary-hover" />
      </AFloatingBox>
    );
  }

  return (
    <AFloatingBox>
      <table className="table-auto admin-table">
        <thead className="text-left">
          <tr>
            <th>
              <span className="bg-white inline-flex p-[2px] rounded">
                <input
                  type="checkbox"
                  onChange={selectAll}
                  className="size-3.5"
                />
              </span>
            </th>
            <th>Name</th>
            <th>Label</th>
            <th>Products</th>
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
                  className="size-4"
                />
              </td>

              <td>{item.name}</td>
              <td className="capitalize">{item.label || item.name}</td>
              <td>50+</td>
              <td>
                <div className="flex gap-1 justify-end">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 no-focus bg-transparent border-slate-300 hover:bg-slate-600 hover:border-slate-600 group"
                  >
                    <Eye className="size-4 text-gray-700 group-hover:text-white" />
                  </Button>

                  <Link href={`/admin/categories/${item._id}`}>
                    <Button
                      size="icon"
                      className="h-8 no-focus bg-transparent border border-green-300 text-green-500 hover:bg-green-500 hover:border-green-500 group"
                    >
                      <Edit className="size-4 group-hover:text-white" />
                    </Button>
                  </Link>

                  <Button
                    size="icon"
                    className="h-8 no-focus bg-transparent border border-red-300 text-red-500 hover:bg-red-500 hover:border-red-500 group"
                  >
                    <Trash2 className="size-4 group-hover:text-white" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AFloatingBox>
  );
};

export default CategoriesTable;
