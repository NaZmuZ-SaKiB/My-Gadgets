"use client";

import OrdersTable from "@/components/admin/shared/OrdersTable";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";

import { useOrderGetAllQuery } from "@/lib/queries/order.query";
import { TOrder } from "@/types/order.type";

const RecentOrders = () => {
  const { data: ordersData, isLoading } = useOrderGetAllQuery(`limit=5`);
  const orders: TOrder[] = ordersData?.data;

  return (
    <div>
      <AFloatingBox className="mb-4">
        <h2 className="text-lg font-medium text-slate-700">Recent Orders</h2>
      </AFloatingBox>
      <OrdersTable orders={orders} isLoading={isLoading} />
    </div>
  );
};

export default RecentOrders;
