import { Metadata } from "next";
import { unstable_cache as cache } from "next/cache";

import Services from "./_components/Services";
import SeoContent from "./_components/SeoContent";
import BannerSection from "./_components/BannerSection";
import FeaturedBrands from "./_components/FeaturedBrands";
import PopularProducts from "./_components/PopularProducts";
import BranchesSection from "./_components/BranchesSection";
import FeaturedProducts from "./_components/FeaturedProducts";
import FlashSaleSection from "./_components/FlashSaleSection";
import FeaturedCategories from "./_components/FeaturedCategories";
import ProductListsSection from "./_components/ProductListsSection";

import { THomepageSettings } from "@/types/settings.type";
import { settingsGetAction } from "@/lib/actions/settings.action";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover the latest gadgets at My-Gadgets! From smartphones and smartwatches to home automation and gaming accessories, we offer cutting-edge tech at competitive prices.",
};

const getCachedHomepageSettings = cache(
  async () => {
    return settingsGetAction("homepage");
  },
  ["homepage-settings"],
  { tags: ["homepage-settings"] },
);

const HomePage = async () => {
  const settingsData = await getCachedHomepageSettings();
  const homePageSettings: THomepageSettings = settingsData?.data?.homepage;

  return (
    <div className="mg-container">
      <BannerSection
        sliderImages={homePageSettings.sliderImages}
        bannerImage1={homePageSettings.bannerImage1}
        bannerImage2={homePageSettings.bannerImage2}
        bannerImage3={homePageSettings.bannerImage3}
      />
      <FeaturedCategories
        featuredCategories={homePageSettings.featuredCategories || []}
      />
      <PopularProducts popularProducts={homePageSettings.popularProducts} />
      <FeaturedProducts featuredProducts={homePageSettings.featuredProducts} />
      <FlashSaleSection flashSales={homePageSettings.flashSale || []} />
      <SeoContent description={homePageSettings.description} />
      <ProductListsSection
        topSelling={homePageSettings.topSellingProducts}
        trendingProducts={homePageSettings.trendingProducts}
      />
      <FeaturedBrands brands={homePageSettings.featuredBrands} />
      <Services />
      <BranchesSection />
    </div>
  );
};

export default HomePage;
