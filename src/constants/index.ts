import { TDeliveryOption, TPaymentMethod } from "@/types/order.type";

export * from "./assets";
export * from "./adminSidebar";
export * from "./sortOptions";
export * from "./product";
export * from "./tags";

export const backendUrl = process.env.BACKEND_URL;
export const authKey = "mg-jwt";
export const USER_ROLE = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
} as const;

export const paymentMethods: TPaymentMethod[] = [
  "cash-on-delivery",
  "bank-transfer",
  "stripe",
];

export const deliveryOptions: TDeliveryOption[] = ["pickup", "delivery"];
