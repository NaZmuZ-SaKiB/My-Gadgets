import { currentUser } from "@/lib/actions/auth.action";
import { orderGetAllAction } from "@/lib/actions/order.action";
import { TOrder } from "@/types/order.type";
import { formatCurrency } from "@/utils/currencyFormat";
import Link from "next/link";

const MyOrdersPage = async () => {
  const user = await currentUser();

  const ordersData = await orderGetAllAction(`user=${user?._id}`);
  const orders: TOrder[] = ordersData?.data || [];

  return (
    <div className="mg-container">
      {orders?.length > 0 ? (
        <table className="table table-auto primary-table">
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
                  <Link href={`/account/orders/${order._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="rounded-xl border border-slate-200 px-5 py-10">
          <p className="text-3xl text-slate-400 font-bold text-center">
            No orders found
          </p>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
