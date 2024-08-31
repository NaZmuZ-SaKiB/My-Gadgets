import { z } from "zod";

const create = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters"),
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .min(3, "Address must be at least 3 characters"),
  phone: z
    .string({
      required_error: "Phone is required",
      invalid_type_error: "Phone must be a string",
    })
    .min(9, "Phone must be at least 3 characters"),
  mapLink: z
    .string({
      invalid_type_error: "Map link must be a string",
    })
    .optional(),
});

export const BranchValidation = {
  create,
};
