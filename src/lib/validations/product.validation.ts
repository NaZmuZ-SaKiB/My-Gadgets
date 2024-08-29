import { z } from "zod";

const create = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(5, "Name must be at least 5 characters"),
  slug: z
    .string({
      required_error: "Slug is required",
    })
    .min(5, "Slug must be at least 5 characters"),
  model: z.string({
    required_error: "Model is required",
  }),
  quantity: z.number({
    required_error: "Quantity is required",
  }),
  salePrice: z.number({
    required_error: "Sale price is required",
  }),
  regularPrice: z.number({
    required_error: "Regular price is required",
  }),
  shippingCost: z.number({
    required_error: "Shipping cost is required",
  }),
  badgeText: z.string().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  shortDescription: z.string({
    required_error: "Short description is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  specifications: z.string({
    required_error: "Specifications is required",
  }),
  brand: z.string({
    required_error: "Brand is required",
  }),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  operatingSystem: z.string().optional(),
  connectivity: z.array(z.string()).optional(),
  chargingPort: z.string().optional(),
  weight: z.number().optional(),
  powerSource: z.string().optional(),
  camera: z.number().optional(),
  displaySize: z.number().optional(),
  compatibility: z.array(z.string()).optional(),
});

export const ProductValidation = {
  create,
};
