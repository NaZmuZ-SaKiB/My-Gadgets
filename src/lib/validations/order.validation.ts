import { z } from "zod";

const orderItem = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  slug: z.string({
    required_error: "Slug is required",
  }),
  image: z
    .string({
      required_error: "Image is required",
    })
    .url({
      message: "Image must be a valid URL",
    }),
  price: z.number({
    required_error: "Price is required",
  }),
  quantity: z.number({
    required_error: "Quantity is required",
  }),
  product: z.string({
    required_error: "Product is required",
  }),
});

const create = z.object({
  orderItems: z.array(orderItem).min(1, {
    message: "Order items must have at least one item",
  }),
  shippingAddress: z.string().min(1, {
    message: "Shipping address is required",
  }),
  paymentMethod: z.string().min(1, {
    message: "Payment method is required",
  }),
  shippingCharge: z.number(),
  totalPrice: z.number(),
  paymentResult: z.string().optional(),
  transactionId: z.string().optional(),
  isPaid: z.boolean().optional(),
  paidAt: z.date().optional(),
  deliveryOption: z.string().min(1, {
    message: "Delivery option is required",
  }),
});

const update = z.object({
  shippingAddress: z.string().optional(),
  isPaid: z.boolean().optional(),
  status: z.string().optional(),
  cancelRequested: z.boolean().optional(),
  transactionId: z.string().optional(),
  paidAt: z.date().optional(),
  paymentResult: z.string().optional(),
});

export const OrderValidation = {
  create,
  update,
};
