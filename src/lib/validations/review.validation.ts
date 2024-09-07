import { z } from "zod";

const create = z.object({
  product: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(500),
  status: z.string(),
});

export const ReviewValidation = {
  create,
};
