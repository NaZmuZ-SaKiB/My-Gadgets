"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";
import SelectedItemsCount from "@/components/admin/shared/SelectedItemsCount";
import { orderSortOptions } from "@/constants";
import { useState } from "react";
import OrdersTable from "./OrdersTable";

const OrdersData = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-3">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          <SelectedItemsCount count={selectedOrders.length} />

          {/* Order Bulk Actions  */}

          <div className="sm:hidden">
            <DataLimitSelect />
          </div>

          <DataSortBySelect options={orderSortOptions} />

          <DataSortOrderSelect />
        </div>

        {/* Order Search Box */}
      </AFloatingBox>

      <OrdersTable
        selectedOrders={selectedOrders}
        setSelectedOrders={setSelectedOrders}
      />
    </div>
  );
};

export default OrdersData;
