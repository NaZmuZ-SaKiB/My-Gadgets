import { images } from "@/constants";
import { branchGetAllAction } from "@/lib/actions/branch.action";
import { orderGetByIdAction } from "@/lib/actions/order.action";
import { TBranch } from "@/types/branch.type";
import { TOrder } from "@/types/order.type";
import { formatCurrency } from "@/utils/currencyFormat";
import numberToWord from "@/utils/numberToWord";
import Image from "next/image";
import InvoiceDownloadButton from "../../_components/InvoiceDownloadButton";
import { Metadata } from "next";

type TProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Invoice",
  description:
    "View the details of your order, including the products you have ordered, payment status, and delivery information.",
};

const InvoicePage = async (props: TProps) => {
  const params = await props.params;
  const { id } = params;

  const orderData = await orderGetByIdAction(id);
  const order: TOrder = orderData.data;

  const branchData = await branchGetAllAction("limit=1");
  const branch: TBranch = branchData.data[0];

  const subTotal = order.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="mt-4">
      <div
        id="invoice"
        className="mx-auto mt-4 min-h-[800px] max-w-screen-sm p-5 shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.1)]"
      >
        <div className="flex items-center justify-between">
          <Image
            src={images.logo}
            className="max-w-10 max-xl:h-10 max-sm:size-8"
            alt="logo"
          />

          <div className="text-right">
            <h3 className="text-sm font-semibold uppercase">My Gadgets</h3>
            <div className="text-xs">
              <p>
                {branch.name}
                {branch.name.toLowerCase().includes("branch") ? "" : " Branch"}
              </p>
              <p>{branch.address}</p>
              <p>{branch.phone}</p>
              <p>
                <span className="font-semibold">Invoice: </span>
                <span className="uppercase">{order._id}</span>
              </p>
            </div>
          </div>
        </div>

        <h1 className="mt-2 border-y py-1.5 text-center font-bold uppercase text-sky-500">
          Invoice
        </h1>

        <div className="mt-3 flex items-start justify-between text-sm">
          <div>
            <h4 className="font-semibold text-sky-600">Customer</h4>
            <h4 className="font-semibold uppercase">{order.user.name}</h4>

            <div className="text-xs">
              <p>
                <span className="font-semibold">Phone: </span>
                {order.shippingAddress.phone}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                {order.user.email}
              </p>
              <p>
                <span className="font-semibold">Customer ID: </span>
                {order.user._id}
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <h4 className="font-semibold text-sky-600">Address</h4>
            <p>{order.shippingAddress.addressLine1}</p>

            <h4 className="mt-2 font-semibold text-sky-600">Order Date</h4>
            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <table className="primary-table mt-4 table w-full table-auto">
          <thead>
            <tr>
              <th className="!border-t-red-500 !p-0.5 text-left !text-xs">
                S/N
              </th>
              <th className="!border-t-red-500 !p-0.5 text-left !text-xs">
                Product
              </th>
              <th className="!border-t-red-500 !p-0.5 text-center !text-xs">
                Price
              </th>
              <th className="!border-t-red-500 !p-0.5 text-center !text-xs">
                Quantity
              </th>
              <th className="!border-t-red-500 !p-0.5 text-center !text-xs">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, i) => (
              <tr key={`${item.name}`} className="!text-black">
                <td className="!p-0.5 text-left !text-xs">{i}</td>
                <td className="!p-0.5 text-left !text-xs">{item.name}</td>
                <td className="!p-0.5 text-center !text-xs">
                  {formatCurrency(item.price)}
                </td>
                <td className="!p-0.5 text-center !text-xs">{item.quantity}</td>
                <td className="!p-0.5 text-right !text-xs">
                  {formatCurrency(item.price * item.quantity)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5}></td>
            </tr>
            <tr className="font-semibold text-black">
              <td className="!p-0.5 text-right !text-xs" colSpan={3}>
                Sub Total
              </td>
              <td className="!p-0.5 text-right !text-xs" colSpan={2}>
                {formatCurrency(subTotal)}
              </td>
            </tr>
            <tr className="font-semibold text-black">
              <td className="!p-0.5 text-right !text-xs" colSpan={3}>
                Shipping Charge
              </td>
              <td className="!p-0.5 text-right !text-xs" colSpan={2}>
                {formatCurrency(order.shippingCharge)}
              </td>
            </tr>
            <tr className="font-semibold text-black">
              <td className="!p-0.5 text-right !text-xs" colSpan={3}>
                Paid Amount
              </td>
              <td className="!p-0.5 text-right !text-xs" colSpan={2}>
                {formatCurrency(order.isPaid ? order.totalPrice : 0)}
              </td>
            </tr>
            <tr className="font-semibold text-black">
              <td className="!p-0.5 text-right !text-xs" colSpan={3}>
                Outstanding
              </td>
              <td className="!p-0.5 text-right !text-xs" colSpan={2}>
                {formatCurrency(!order.isPaid ? order.totalPrice : 0)}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-xs">
          <span className="font-semibold">Amount in words: </span>
          <span className="uppercase">
            {numberToWord(order.totalPrice)}{" "}
            <span className="font-semibold">Taka</span> only
          </span>
        </p>

        <h4 className="mt-2 text-xs font-semibold">Terms & Conditions</h4>
        <ol className="list-decimal pl-4 text-[10px]">
          <li>Goods once sold will not be refunded & changed.</li>
          <li>Payment terms should be ON CASH or by BANK TRANSFER</li>
          <li>Other terms & condition apply as Principal Company policy</li>
          <li>
            Read the Manual Book supplied with the product with attention and
            follow the service instruction properly
          </li>
        </ol>
      </div>
      <InvoiceDownloadButton />
    </div>
  );
};

export default InvoicePage;
