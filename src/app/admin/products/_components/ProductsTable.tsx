"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
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
import ProductDeleteDialog from "./ProductDeleteDialog";
import MGPagination from "@/components/global/shared/MGPagination";

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
      <AFloatingBox className="grid flex-1 place-items-center">
        <Loader2 className="mx-auto size-[50px] animate-spin text-primary-hover" />
      </AFloatingBox>
    );
  }
  return (
    <AFloatingBox className="overflow-x-auto">
      <table className="admin-table min-w-[800px] table-auto">
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
                  className="no-focus size-4"
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
                <div className="flex justify-end gap-1 max-md:flex-wrap">
                  <Link
                    href={`/products/${item.slug}/${item._id}`}
                    className="no-focus"
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      className="no-focus group h-8 border-slate-300 bg-transparent hover:border-slate-600 hover:bg-slate-600"
                    >
                      <Eye className="size-4 text-slate-700 group-hover:text-white" />
                    </Button>
                  </Link>

                  <Link
                    href={`/admin/products/${item._id}`}
                    className="no-focus"
                  >
                    <Button
                      size="icon"
                      className="no-focus group h-8 border border-green-300 bg-transparent text-green-500 hover:border-green-500 hover:bg-green-500"
                    >
                      <Edit className="size-4 group-hover:text-white" />
                    </Button>
                  </Link>

                  <ProductDeleteDialog products={[`${item._id}`]}>
                    <Button
                      size="icon"
                      className="no-focus group h-8 border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-500"
                    >
                      <Trash2 className="size-4 group-hover:text-white" />
                    </Button>
                  </ProductDeleteDialog>
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

export default ProductsTable;
