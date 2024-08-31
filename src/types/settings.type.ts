export type THomepageSettings = {
  sliderImages: string[];
  bannerImage1: string;
  bannerImage2: string;
  bannerImage3: string;
  featuredCategories: string[];
  featuredBrands: string[];
  popularProducts: string[];
  featuredProducts: {
    banner?: string;
    products: string[];
  }[];
  flashSale: {
    product: string;
    endDate: Date;
  }[];
  topSellingProducts: string[];
  trendingProducts: string[];
  description: string;
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
  footer: TFooterSettings;
};
