"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import { Button } from "@/components/ui/button";
import { useOrderGetAllQuery } from "@/lib/queries/order.query";
import { TOrder } from "@/types/order.type";
import { formatCurrency } from "@/utils/currencyFormat";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

type TProps = {
  selectedOrders: string[];
  setSelectedOrders: (value: string[]) => void;
};

const OrdersTable = ({ selectedOrders, setSelectedOrders }: TProps) => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useOrderGetAllQuery(searchParams.toString());

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrders(data?.data?.map((item: any) => item._id) || []);
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelectedOrders([...selectedOrders, id]);
    } else {
      setSelectedOrders(selectedOrders.filter((item) => item !== id));
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
            <th>Customer</th>
            <th>Phone</th>
            <th>Items</th>
            <th>Price</th>
            <th>Paid</th>
            <th>Status</th>
            <th>Cancel Requested</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((item: TOrder) => (
            <tr key={`${item._id}`}>
              <td>
                <input
                  checked={selectedOrders.includes(item._id)}
                  type="checkbox"
                  onChange={(e) => handleSelect(e, item._id)}
                  className="size-4 no-focus"
                />
              </td>
              <td>{item.user?.name}</td>
              <td>{item?.shippingAddress?.phone}</td>
              <td>{item.orderItems.length}</td>
              <td>{formatCurrency(item.totalPrice)}</td>
              <td>{item.isPaid ? "Paid" : "Not Paid"}</td>
              <td className="capitalize">{item.status}</td>
              <td>{item.cancelRequested ? "Yes" : "No"}</td>
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
    </AFloatingBox>
  );
};

export default OrdersTable;
