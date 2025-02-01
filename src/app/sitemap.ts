import { categoryGetAllAction } from "@/lib/actions/category.action";
import { productGetAllAction } from "@/lib/actions/product.action";
import { TCategory } from "@/types/category.type";
import { TProduct } from "@/types/product.type";

export default async function sitemap() {
  const baseURL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const productsData = await productGetAllAction("limit=9999999999");
  const products: TProduct[] = productsData.data;

  const productURLs = products.map((product) => ({
    url: `${baseURL}/products/${product.slug}/${product._id}`,
    lastModified: product.updatedAt,
  }));

  const categoriesData = await categoryGetAllAction("limit=9999999999");
  const categories: TCategory[] = categoriesData.data;

  const categoryURLs = categories.map((category) => ({
    url: `${baseURL}/shop/${category.name}`,
    lastModified: category.updatedAt,
  }));

  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/shop`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/about-us`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/emi-terms`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/refund-return-policy`,
      lastModified: new Date(),
    },
    ...categoryURLs,
    ...productURLs,
  ];
}
