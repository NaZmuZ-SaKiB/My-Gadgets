"use client";

import Link from "next/link";
import { Eye, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import OrderIsPaidSelect from "./OrderIsPaidSelect";
import DataLimitSelect from "./filters/DataLimitSelect";
import MGPagination from "@/components/global/shared/MGPagination";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import OrderStatusSelect from "@/components/admin/shared/OrderStatusSelect";

import { TOrder } from "@/types/order.type";
import { formatCurrency } from "@/utils/currencyFormat";

type TProps = {
  orders: TOrder[];
  isLoading: boolean;
  meta?: any;
};

const OrdersTable = ({ orders, isLoading, meta }: TProps) => {
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
              <td className={item.cancelRequested ? "text-red-500" : ""}>
                {item.cancelRequested ? "Yes" : "No"}
              </td>
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
              <td colSpan={8} className="text-center text-xl">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {meta && (
        <div className="mt-5 flex items-center justify-center gap-3 sm:justify-between">
          <div className="max-sm:hidden">
            <DataLimitSelect />
          </div>
          <MGPagination
            admin
            limit={meta?.limit as number}
            page={meta?.page as number}
            total={meta?.total as number}
          />
        </div>
      )}
    </AFloatingBox>
  );
};

export default OrdersTable;
