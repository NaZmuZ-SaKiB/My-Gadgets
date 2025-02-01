"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import AGrid from "@/components/admin/admin-ui/AGrid";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import OrderIsPaidSelect from "@/components/admin/shared/OrderIsPaidSelect";
import OrderStatusSelect from "@/components/admin/shared/OrderStatusSelect";

import { TOrder } from "@/types/order.type";
import { formatCurrency } from "@/utils/currencyFormat";
import { useOrderGetByIdQuery } from "@/lib/queries/order.query";

const SingleOrderPage = () => {
  const params = useParams();

  const { data: orderData, isLoading } = useOrderGetByIdQuery(
    params.id as string,
  );
  const order: TOrder = orderData?.data;

  if (isLoading) {
    return (
      <APageContainer>
        <div className="grid flex-1 place-items-center">
          <Loader2 className="mx-auto size-[50px] animate-spin text-primary-hover" />
        </div>
      </APageContainer>
    );
  }
  return (
    <APageContainer>
      <APageHeading title="Order Details" />

      <AGrid small>
        <AFloatingBox>
          <ul className="text-sm leading-7 text-slate-700 max-sm:border-y">
            <li>
              <span className="font-semibold">Order ID:</span>{" "}
              <span className="uppercase">{order.orderId}</span>
            </li>
            <li>
              <span className="font-semibold">Payment Method:</span>{" "}
              <span className="capitalize">{order.paymentMethod}</span>
            </li>
            {order.transactionId && (
              <li>
                <span className="font-semibold">Transaction ID:</span>{" "}
                <span className="capitalize">{order.transactionId}</span>
              </li>
            )}
            <li>
              <span className="font-semibold">Receive Option:</span>{" "}
              <span className="capitalize">{order.deliveryOption}</span>
            </li>
            <li>
              <span className="font-semibold">Shipping Address:</span>{" "}
              <span className="capitalize">
                {order.shippingAddress.addressLine1}
                {order.shippingAddress.addressLine2 &&
                  `, ${order.shippingAddress.addressLine2}`}
                , {order.shippingAddress.city}, {order.shippingAddress.district}
                , {order.shippingAddress.division}
              </span>
            </li>
            <li className="mb-2">
              <span className="font-semibold">Postal Code:</span>{" "}
              <span className="capitalize">
                {order.shippingAddress.zipCode}
              </span>
            </li>
            <li className="mb-2">
              <span className="font-semibold">Phone:</span>{" "}
              <span className="capitalize">{order.shippingAddress.phone}</span>
            </li>
            <li className="mb-2 flex max-w-[15rem] items-center gap-2">
              <span className="font-semibold">Payment:</span>
              <OrderIsPaidSelect
                currentIsPaid={order.isPaid}
                orderId={order._id}
              />
            </li>
            <li className="flex max-w-[15rem] items-center gap-2">
              <span className="font-semibold">Status:</span>
              <OrderStatusSelect
                currentStatus={order.status}
                orderId={order._id}
              />
            </li>
          </ul>
        </AFloatingBox>
      </AGrid>
      <AFloatingBox>
        <table className="admin-table table-auto overflow-hidden rounded-md">
          <thead className="text-left">
            <tr>
              <th className="max-md:hidden">Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th className="max-md:hidden">Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {order.orderItems.map((item) => (
              <tr key={`single-order-page-item-${item.name}`}>
                <td className="max-md:hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td className="max-md:hidden">{formatCurrency(item.price)}</td>
                <td>{formatCurrency(item.price * item.quantity)}</td>
              </tr>
            ))}
            <tr>
              <td
                className="text-right font-semibold text-slate-900"
                colSpan={3}
              >
                Shipping Charge
              </td>
              <td
                className="text-right font-semibold text-slate-900"
                colSpan={2}
              >
                {formatCurrency(order.shippingCharge)}
              </td>
            </tr>
            <tr>
              <td
                className="text-right font-semibold text-slate-900"
                colSpan={3}
              >
                Total
              </td>
              <td
                className="text-right font-semibold text-slate-900"
                colSpan={2}
              >
                {formatCurrency(order.totalPrice)}
              </td>
            </tr>
          </tbody>
        </table>
      </AFloatingBox>
    </APageContainer>
  );
};

export default SingleOrderPage;
