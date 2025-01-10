"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import OrdersTable from "@/components/admin/shared/OrdersTable";
import { useOrderGetAllQuery } from "@/lib/queries/order.query";
import { useUserGetByIdQuery } from "@/lib/queries/user.query";
import { TOrder } from "@/types/order.type";
import { TUser } from "@/types/user.type";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const UserOrdersPage = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const params = useParams();

  const { data: userData, isLoading: userLoading } = useUserGetByIdQuery(
    params?.id as string,
  );
  const user: TUser = userData?.data;

  const { data: orderData, isLoading: orderLoading } = useOrderGetAllQuery(
    `user=${params.id}`,
  );
  const orders: TOrder[] = orderData?.data || [];

  return (
    <APageContainer>
      <APageHeading title={userLoading ? "Orders" : `${user.name}'s Orders`} />

      <OrdersTable
        selectedOrders={selectedOrders}
        setSelectedOrders={setSelectedOrders}
        orders={orders}
        isLoading={orderLoading}
      />
    </APageContainer>
  );
};

export default UserOrdersPage;
