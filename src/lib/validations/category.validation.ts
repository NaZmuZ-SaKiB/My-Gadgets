import { z } from "zod";

export const create = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 20 characters long"),
  label: z
    .string({
      required_error: "Label is required",
      invalid_type_error: "Label must be a string",
    })
    .min(3, "Label must be at least 3 characters long")
    .max(25, "Label must be at most 25 characters long"),
  parent: z.string().optional(),
  image: z.string().optional(),
});

export const CategoryValidation = {
  create,
};
