"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import { Button } from "@/components/ui/button";
import { TOrder } from "@/types/order.type";
import { formatCurrency } from "@/utils/currencyFormat";
import { Eye, Loader2 } from "lucide-react";
import { ChangeEvent } from "react";
import OrderStatusSelect from "@/components/admin/shared/OrderStatusSelect";
import OrderIsPaidSelect from "./OrderIsPaidSelect";
import Link from "next/link";

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
              <td>
                <OrderIsPaidSelect
                  orderId={`${item?._id}`}
                  currentIsPaid={item.isPaid}
                />
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
                  <Link href={`/admin/orders/${item._id}`}>
                    <Button
                      size="icon"
                      variant="outline"
                      className="no-focus group h-8 border-slate-300 bg-transparent hover:border-slate-600 hover:bg-slate-600"
                    >
                      <Eye className="size-4 text-slate-700 group-hover:text-white" />
                    </Button>
                  </Link>
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
