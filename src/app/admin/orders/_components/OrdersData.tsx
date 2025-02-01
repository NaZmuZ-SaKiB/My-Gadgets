"use client";

import { useSearchParams } from "next/navigation";

import OrdersTable from "@/components/admin/shared/OrdersTable";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import OrderStatusFilter from "@/components/admin/shared/filters/OrderStatusFilter";
import OrderIsPaidFilter from "@/components/admin/shared/filters/OrderIsPaidFilter";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";

import { useOrderGetAllQuery } from "@/lib/queries/order.query";
import { orderSortOptions } from "@/constants";

const OrdersData = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useOrderGetAllQuery(searchParams.toString());

  const orders = data?.data || [];

  return (
    <div className="flex flex-col gap-3">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <OrderStatusFilter />
          <OrderIsPaidFilter />

          <div className="sm:hidden">
            <DataLimitSelect />
          </div>

          <DataSortBySelect options={orderSortOptions} />

          <DataSortOrderSelect />
        </div>

        <DataSearchBox />
      </AFloatingBox>

      <OrdersTable orders={orders} isLoading={isLoading} meta={data?.meta} />
    </div>
  );
};

export default OrdersData;
