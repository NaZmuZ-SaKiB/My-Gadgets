import MGPagination from "@/components/global/shared/MGPagination";
import { currentUser } from "@/lib/actions/auth.action";
import { orderGetAllAction } from "@/lib/actions/order.action";
import { TOrder } from "@/types/order.type";
import { formatCurrency } from "@/utils/currencyFormat";
import { Metadata } from "next";
import Link from "next/link";

type TProps = {
  searchParams: any;
};

export const metadata: Metadata = {
  title: "My Orders",
  description: "View your orders.",
};

const MyOrdersPage = async (props: TProps) => {
  const searchParams = await props.searchParams;

  const user = await currentUser();

  const queries = new URLSearchParams(searchParams);

  const ordersData = await orderGetAllAction(
    `user=${user?._id}&${queries.toString()}`,
  );
  const orders: TOrder[] = ordersData?.data || [];

  return (
    <div className="lg:mg-container">
      <h1 className="mb-4 text-3xl font-semibold text-slate-700">
        Your Orders
      </h1>

      {orders?.length > 0 ? (
        <table className="primary-table table table-auto">
          <thead>
            <tr>
              <th className="text-left">Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={`${order._id}`}>
                <td className="uppercase">{order._id.toString()}</td>
                <td className="text-center">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="text-center">{order.status}</td>
                <td className="text-center">
                  {formatCurrency(order.totalPrice)}
                </td>
                <td className="text-center text-primary">
                  <Link href={`/orders/${order._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="rounded-xl border border-slate-200 px-5 py-10">
          <p className="text-center text-3xl font-bold text-slate-400">
            No orders found
          </p>
        </div>
      )}

      <div className="mt-5">
        <MGPagination
          limit={ordersData?.meta?.limit as number}
          page={ordersData?.meta?.page as number}
          total={ordersData?.meta?.total as number}
        />
      </div>
    </div>
  );
};

export default MyOrdersPage;
