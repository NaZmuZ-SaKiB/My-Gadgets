import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseURL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
