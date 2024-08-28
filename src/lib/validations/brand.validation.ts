import { z } from "zod";

export const create = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 20 characters long"),
  image: z
    .string({
      invalid_type_error: "Image must be a string",
    })
    .optional(),
});

export const BrandValidation = {
  create,
};
