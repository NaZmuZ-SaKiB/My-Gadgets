import { TBrand } from "./brand.type";
import { TCategory } from "./category.type";
import { TMedia } from "./media.type";
import { TProduct } from "./product.type";

export type THomepageSettings = {
  sliderImages: TMedia[];
  bannerImage1: TMedia;
  bannerImage2: TMedia;
  bannerImage3: TMedia;
  featuredCategories: TCategory[];
  featuredBrands: TBrand[];
  popularProducts: TProduct[];
  featuredProducts: {
    banner?: TMedia;
    products: TProduct[];
  }[];
  flashSale: {
    product: TProduct;
    endDate: Date;
  }[];
  topSellingProducts: TProduct[];
  trendingProducts: TProduct[];
  description: string;
};

export type TCategorySettings = {
  showOnTopMenu: TCategory[];
  featured: TCategory[];
};

export type TFooterSettings = {
  slogan: string;
  email: string;
  hours: string;
  contact: string;
  copyright: string;
};

export type TSettings = {
  _id: string;
  homepage: THomepageSettings;
  category: TCategorySettings;
  footer: TFooterSettings;
};
