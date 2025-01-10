"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import { Button } from "@/components/ui/button";
import { TOrder } from "@/types/order.type";
import { formatCurrency } from "@/utils/currencyFormat";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { ChangeEvent } from "react";
import OrderStatusSelect from "@/components/admin/shared/OrderStatusSelect";
import { cn } from "@/lib/utils";

type TProps = {
  selectedOrders: string[];
  setSelectedOrders: (value: string[]) => void;
  orders: TOrder[];
  isLoading: boolean;
};

const OrdersTable = ({
  selectedOrders,
  setSelectedOrders,
  orders,
  isLoading,
}: TProps) => {
  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map((item: any) => item._id) || []);
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
            <th>Customer</th>
            <th>Phone</th>
            <th>Items</th>
            <th>Price</th>
            <th>Paid</th>
            <th>Status</th>
            <th>Cancel Req</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((item: TOrder) => (
            <tr key={`${item._id}`}>
              <td>
                <input
                  checked={selectedOrders.includes(item._id)}
                  type="checkbox"
                  onChange={(e) => handleSelect(e, item._id)}
                  className="no-focus size-4"
                />
              </td>
              <td>{item.user?.name}</td>
              <td>{item?.shippingAddress?.phone}</td>
              <td>{item.orderItems.length}</td>
              <td>{formatCurrency(item.totalPrice)}</td>
              <td
                className={cn({
                  "font-semibold text-green-500": item.isPaid,
                  "text-red-500": !item.isPaid,
                })}
              >
                {item.isPaid ? "Paid" : "Not Paid"}
              </td>
              <td>
                <OrderStatusSelect
                  orderId={`${item?._id}`}
                  currentStatus={item.status}
                />
              </td>
              <td>{item.cancelRequested ? "Yes" : "No"}</td>
              <td>
                <div className="flex justify-end gap-1 max-md:flex-wrap">
                  <Button
                    size="icon"
                    variant="outline"
                    className="no-focus group h-8 border-slate-300 bg-transparent hover:border-slate-600 hover:bg-slate-600"
                  >
                    <Eye className="size-4 text-slate-700 group-hover:text-white" />
                  </Button>

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

                  <Button
                    size="icon"
                    className="no-focus group h-8 border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-500"
                  >
                    <Trash2 className="size-4 group-hover:text-white" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {orders?.length === 0 && (
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
