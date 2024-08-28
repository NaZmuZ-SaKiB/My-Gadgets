"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import { Button } from "@/components/ui/button";
import { useBrandGetAllQuery } from "@/lib/queries/brand.query";
import { TBrand } from "@/types/brand.type";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import FeaturedSwitch from "./FeaturedSwitch";
import BrandDeleteDialog from "./BrandDeleteDialog";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import APagination from "@/components/admin/shared/APagination";
import Image from "next/image";
import { images } from "@/constants";

type TProps = {
  selectedBrands: string[];
  setSelectedBrands: (value: string[]) => void;
};

const BrandsTable = ({ selectedBrands, setSelectedBrands }: TProps) => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useBrandGetAllQuery(searchParams.toString());

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedBrands(data?.data?.map((item: any) => item._id) || []);
    } else {
      setSelectedBrands([]);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelectedBrands([...selectedBrands, id]);
    } else {
      setSelectedBrands(selectedBrands.filter((item) => item !== id));
    }
  };
  // End Handle Select

  if (isLoading) {
    return (
      <AFloatingBox className="flex-1 grid place-items-center">
        <Loader2 className="animate-spin mx-auto size-[50px] text-primary-hover" />
      </AFloatingBox>
    );
  }

  return (
    <AFloatingBox className="overflow-x-auto">
      <table className="table-auto admin-table min-w-[500px]">
        <thead className="text-left">
          <tr>
            <th>
              <span className="bg-white inline-flex p-[2px] rounded">
                <input
                  type="checkbox"
                  onChange={selectAll}
                  className="size-3.5 no-focus"
                />
              </span>
            </th>
            <th>Img</th>
            <th>Name</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((item: TBrand) => (
            <tr key={`${item._id}`}>
              <td>
                <input
                  checked={selectedBrands.includes(item._id)}
                  type="checkbox"
                  onChange={(e) => handleSelect(e, item._id)}
                  className="size-4 no-focus"
                />
              </td>
              <td>
                <Image
                  src={item.image?.secureUrl || images.defaultImage}
                  width={35}
                  height={35}
                  className="object-contain"
                  alt={item.name}
                />
              </td>
              <td>{item.name}</td>
              <td>
                <FeaturedSwitch
                  id={`${item._id}`}
                  defaultValue={item.featured}
                />
              </td>

              <td>
                <div className="flex gap-1 justify-end">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 no-focus bg-transparent border-slate-300 hover:bg-slate-600 hover:border-slate-600 group"
                  >
                    <Eye className="size-4 text-gray-700 group-hover:text-white" />
                  </Button>

                  <Link href={`/admin/brands/${item._id}`} className="no-focus">
                    <Button
                      size="icon"
                      className="h-8 no-focus bg-transparent border border-green-300 text-green-500 hover:bg-green-500 hover:border-green-500 group"
                    >
                      <Edit className="size-4 group-hover:text-white" />
                    </Button>
                  </Link>

                  <BrandDeleteDialog brands={[`${item._id}`]}>
                    <Button
                      size="icon"
                      className="h-8 no-focus bg-transparent border border-red-300 text-red-500 hover:bg-red-500 hover:border-red-500 group"
                    >
                      <Trash2 className="size-4 group-hover:text-white" />
                    </Button>
                  </BrandDeleteDialog>
                </div>
              </td>
            </tr>
          ))}

          {data?.data?.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-xl">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-5 flex justify-center items-center gap-3 sm:justify-between">
        <div className="max-sm:hidden">
          <DataLimitSelect />
        </div>
        <APagination
          limit={data?.meta?.limit as number}
          page={data?.meta?.page as number}
          total={data?.meta?.total as number}
        />
      </div>
    </AFloatingBox>
  );
};

export default BrandsTable;
