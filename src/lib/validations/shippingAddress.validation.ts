import { z } from "zod";

const create = z.object({
  addressLine1: z.string().min(1, { message: "Address is required." }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  district: z.string().min(1, { message: "District is required." }),
  division: z.string().min(1, { message: "Division is required." }),
  zipCode: z.string().min(1, { message: "Zip code is required." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  default: z.boolean().optional(),
});

export const ShippingAddressValidation = {
  create,
};
