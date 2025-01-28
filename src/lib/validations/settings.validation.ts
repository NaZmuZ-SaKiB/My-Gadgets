import { z } from "zod";

const update = z.object({
  homepage: z
    .object({
      sliderImages: z.array(z.string()).optional(),
      bannerImage1: z.string().optional(),
      bannerImage2: z.string().optional(),
      bannerImage3: z.string().optional(),
      featuredCategories: z.array(z.string()).optional(),
      featuredBrands: z.array(z.string()).optional(),
      popularProducts: z.array(z.string()).optional(),
      featuredProducts: z
        .array(
          z.object({
            banner: z.string().optional(),
            products: z.array(z.string()),
          }),
        )
        .optional(),
      flashSale: z
        .array(
          z.object({
            product: z.string(),
            endDate: z.any({
              required_error: "End Date is required",
            }),
          }),
        )
        .optional(),

      topSellingProducts: z.array(z.string()).optional(),
      trendingProducts: z.array(z.string()).optional(),
      description: z
        .string()
        .trim()
        .transform((value) => value.replace("<p><br></p>", ""))
        .optional(),
    })
    .optional(),

  category: z
    .object({
      showOnTopMenu: z.array(z.string()).optional(),
    })
    .optional(),

  footer: z
    .object({
      slogan: z.string().optional(),
      email: z.string().optional(),
      hours: z.string().optional(),
      contact: z
        .string()
        .trim()
        .transform((value) => value.replace("<p><br></p>", ""))
        .optional(),
      copyright: z.string().trim().optional(),
    })
    .optional(),
});

export const SettingsValidation = {
  update,
};
