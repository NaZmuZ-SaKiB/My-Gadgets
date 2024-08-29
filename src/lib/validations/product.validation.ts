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
  quantity: z.coerce
    .number({
      required_error: "Quantity is required",
    })
    .min(1, "Quantity must be at least 1"),
  salePrice: z.coerce
    .number({
      required_error: "Sale price is required",
    })
    .min(1, "Sale price must be at least 1"),
  regularPrice: z.coerce
    .number({
      required_error: "Regular price is required",
    })
    .min(1, "Regular price must be at least 1"),
  shippingCost: z.coerce
    .number({
      required_error: "Shipping cost is required",
    })
    .min(1, "Shipping cost must be at least 1"),
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
  weight: z.coerce.number().optional(),
  powerSource: z.string().optional(),
  camera: z.coerce.number().optional(),
  displaySize: z.coerce.number().optional(),
  compatibility: z.array(z.string()).optional(),
});

export const ProductValidation = {
  create,
};
