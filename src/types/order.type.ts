import { TShippingAddress } from "./shippingAddress.type";
import { TUser } from "./user.type";

export type TOrderItem = {
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  product: string;
};

export type TPaymentMethod = "cash-on-delivery" | "stripe" | "bank-transfer";

export type TOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

export type TOrder = {
  user: TUser;
  orderItems: TOrderItem[];
  shippingAddress: TShippingAddress;
  paymentMethod: TPaymentMethod;
  paymentResult?: string;
  transactionId?: string;
  shippingCharge: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  completedAt: Date;
  status: TOrderStatus;
  cancelRequested?: boolean;

  createdAt: Date;
  updatedAt: Date;
};
