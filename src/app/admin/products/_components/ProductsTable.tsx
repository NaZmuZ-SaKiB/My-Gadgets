"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import APagination from "@/components/admin/shared/APagination";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import { Button } from "@/components/ui/button";
import { images } from "@/constants";
import { useProductGetAllQuery } from "@/lib/queries/product.query";
import { TProduct } from "@/types/product.type";
import { formatCurrency } from "@/utils/currencyFormat";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

type TProps = {
  selectedProducts: string[];
  setSelectedProducts: (value: string[]) => void;
};

const ProductsTable = ({ selectedProducts, setSelectedProducts }: TProps) => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useProductGetAllQuery(searchParams.toString());

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts(data?.data?.map((item: any) => item._id) || []);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, id]);
    } else {
      setSelectedProducts(selectedProducts.filter((item) => item !== id));
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
      <table className="table-auto admin-table min-w-[800px]">
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
            <th>Model</th>
            <th>Brand</th>
            <th>Categories</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((item: TProduct) => (
            <tr key={`${item._id}`}>
              <td>
                <input
                  checked={selectedProducts.includes(item._id)}
                  type="checkbox"
                  onChange={(e) => handleSelect(e, item._id)}
                  className="size-4 no-focus"
                />
              </td>
              <td>
                <Image
                  src={item.images[0]?.secureUrl || images.defaultImage}
                  width={35}
                  height={35}
                  className="object-contain"
                  alt={item.name}
                />
              </td>
              <td>
                <Link
                  href={`/admin/products/${item._id}`}
                  className="hover:underline"
                >
                  {item.name}
                </Link>
              </td>
              <td>{item.model}</td>
              <td>{item.brand?.name}</td>
              <td>{item.categories.map((cat) => cat.name).join(", ")}</td>
              <td>{item.quantity}</td>
              <td>{formatCurrency(item.salePrice)}</td>
              <td>
                <div className="flex gap-1 justify-end max-md:flex-wrap">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 no-focus bg-transparent border-slate-300 hover:bg-slate-600 hover:border-slate-600 group"
                  >
                    <Eye className="size-4 text-slate-700 group-hover:text-white" />
                  </Button>

                  <Link
                    href={`/admin/products/${item._id}`}
                    className="no-focus"
                  >
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

          {data?.data?.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center text-xl">
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

export default ProductsTable;
