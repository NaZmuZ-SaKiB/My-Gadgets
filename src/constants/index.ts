import {
  TDeliveryOption,
  TOrderStatus,
  TPaymentMethod,
} from "@/types/order.type";

export * from "./assets";
export * from "./adminSidebar";
export * from "./accountSidebar";
export * from "./sortOptions";
export * from "./product";
export * from "./tags";

export const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
export const backendUrl = process.env.BACKEND_URL;
export const authKey = "mg-jwt";
export const USER_ROLE = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
  TEST_ADMIN: "test_admin",
} as const;

export const paymentMethods: TPaymentMethod[] = [
  "cash-on-delivery",
  "bank-transfer",
  "stripe",
];

export const deliveryOptions: TDeliveryOption[] = ["pickup", "delivery"];

export const orderStatuses: TOrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "completed",
  "cancelled",
];

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;
