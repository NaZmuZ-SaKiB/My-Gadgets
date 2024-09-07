import { z } from "zod";

const create = z.object({
  product: z.string(),
  comment: z.string().min(1).max(500),
  rating: z.number().int().min(1).max(5).optional(),
});

export const ReviewValidation = {
  create,
};
