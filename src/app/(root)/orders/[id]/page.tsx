import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import MGButton from "@/components/global/shared/MGButton";
import { orderGetByIdAction } from "@/lib/actions/order.action";
import { cn } from "@/lib/utils";
import { TOrder } from "@/types/order.type";
import { formatCurrency } from "@/utils/currencyFormat";
import Image from "next/image";
import Link from "next/link";
import CancelRequestButton from "../_components/CancelRequestButton";

type TProps = {
  params: Promise<{
    id: string;
  }>;
};

const breadcrumbItems = [
  {
    label: "Orders",
    link: "/account/orders",
  },
  {
    label: "Order Details",
  },
];

const SingleOrderPage = async (props: TProps) => {
  const params = await props.params;
  const { id } = params;

  const orderData = await orderGetByIdAction(id);
  const order: TOrder = orderData.data;

  return (
    <div className="mg-container pt-4">
      <BreadcrumbBar items={breadcrumbItems} />

      <div className="mt-5 sm:mt-3 sm:rounded-xl sm:border sm:border-slate-200 sm:p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold text-slate-700">
              Order Details
            </h1>
            <p className="mt-1 text-sm font-semibold text-slate-500 sm:text-base">
              You have ordered{" "}
              <span className="text-primary">{order.orderItems.length}</span>{" "}
              product
              {order.orderItems.length > 1 ? "s" : ""}
            </p>
          </div>

          <CancelRequestButton
            orderId={`${order._id}`}
            isRequested={Boolean(order.cancelRequested)}
            status={order.status}
          />
        </div>

        {/* -----Order Details---------  */}

        <ul className="mt-4 py-4 text-sm text-slate-700 max-sm:border-y">
          <li>
            <span className="font-semibold">Order ID:</span>{" "}
            <span className="uppercase">{order.orderId}</span>
          </li>
          <li>
            <span className="font-semibold">Payment:</span>{" "}
            <span
              className={cn(
                "font-bold uppercase",
                order.isPaid ? "text-green-600" : "text-red-600",
              )}
            >
              {order.isPaid ? "Paid" : "Not Paid"}
            </span>
          </li>
          <li>
            <span className="font-semibold">Payment Method:</span>{" "}
            <span className="capitalize">{order.paymentMethod}</span>
          </li>
          <li>
            <span className="font-semibold">Receive Option:</span>{" "}
            <span className="capitalize">{order.deliveryOption}</span>
          </li>
          <li>
            <span className="font-semibold">Shipping Address:</span>{" "}
            <span className="capitalize">
              {order.shippingAddress.addressLine1}
            </span>
          </li>
          <li>
            <span className="font-semibold">Phone:</span>{" "}
            <span className="capitalize">{order.shippingAddress.phone}</span>
          </li>
          <li>
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{order.status}</span>
          </li>
        </ul>

        {/* -----Order Table---------  */}

        <div className="mt-6">
          <table className="primary-table table-auto overflow-hidden rounded-md">
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
                <tr key={`my-order-page-item-${item.name}`}>
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
                  <td className="max-md:hidden">
                    {formatCurrency(item.price)}
                  </td>
                  <td>{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5 flex justify-end">
            <div className="flex flex-col gap-2">
              <p className="flex items-end gap-5">
                <span className="font-semibold text-slate-700 md:text-lg">
                  Total:
                </span>
                <span className="col-span-2 text-xl font-semibold text-primary md:text-2xl">
                  {formatCurrency(order.totalPrice)}
                </span>
              </p>

              <Link
                href={`/orders/${order._id}/invoice`}
                className="mt-3 w-full self-end"
              >
                <MGButton className="w-full rounded-md">
                  Download Invoice
                </MGButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
