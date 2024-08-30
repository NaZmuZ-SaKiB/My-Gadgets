import { z } from "zod";

const mainValidation = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(5, "Name must be at least 5 characters"),
  slug: z.string().optional(),
  model: z
    .string({
      required_error: "Model is required",
    })
    .min(1, "Model is required"),
  quantity: z.coerce
    .number({
      required_error: "Quantity is required",
    })
    .min(0, "Quantity must be at least 0"),
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
    .min(0, "Shipping cost must be at least 0"),
  badgeText: z.string().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  shortDescription: z
    .string({
      required_error: "Short description is required",
    })
    .trim()
    .transform((value) => value.replace("<p><br></p>", ""))
    .refine((value) => value.length !== 0, {
      message: "Short description is required",
    }),
  description: z
    .string()
    .trim()
    .transform((value) => value.replace("<p><br></p>", "")),
  specifications: z
    .string({
      required_error: "Specifications is required",
    })
    .trim()
    .transform((value) => value.replace("<p><br></p>", ""))
    .refine((value) => value.length !== 0, {
      message: "Short description is required",
    }),
  brand: z
    .string({
      required_error: "Brand is required",
    })
    .min(1, "Brand is required"),
  categories: z.array(z.string()).optional(),
  operatingSystem: z.string().optional(),
  connectivity: z
    .array(z.any())
    .transform((value) => value.map((v) => v.value))
    .optional(),
  chargingPort: z.string().optional(),
  weight: z.coerce.number().optional(),
  powerSource: z
    .array(z.any())
    .transform((value) => value.map((v) => v.value))
    .optional(),
  camera: z.coerce.number().optional(),
  displaySize: z.coerce.number().optional(),
  compatibility: z
    .array(z.any())
    .transform((value) => value.map((v) => v.value))
    .optional(),
});

const create = mainValidation.refine(
  (data) => data.salePrice <= data.regularPrice,
  {
    message: "Sale price must be less than regular price",
    path: ["salePrice"],
  }
);

const update = mainValidation.partial();
export const ProductValidation = {
  create,
  update,
};
