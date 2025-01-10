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

export type TDeliveryOption = "pickup" | "delivery";

export type TOrder = {
  _id: string;
  orderId: string;
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
  deliveryOption: TDeliveryOption;

  createdAt: Date;
  updatedAt: Date;
};
