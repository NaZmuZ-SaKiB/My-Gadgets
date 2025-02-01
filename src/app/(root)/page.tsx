import { settingsGetAction } from "@/lib/actions/settings.action";
import BannerSection from "./_components/BannerSection";
import BranchesSection from "./_components/BranchesSection";
import FeaturedCategories from "./_components/FeaturedCategories";
import FeaturedProducts from "./_components/FeaturedProducts";
import FlashSaleSection from "./_components/FlashSaleSection";
import PopularProducts from "./_components/PopularProducts";
import ProductListsSection from "./_components/ProductListsSection";
import Services from "./_components/Services";
import { THomepageSettings } from "@/types/settings.type";
import FeaturedBrands from "./_components/FeaturedBrands";
import SeoContent from "./_components/SeoContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover the latest gadgets at My-Gadgets! From smartphones and smartwatches to home automation and gaming accessories, we offer cutting-edge tech at competitive prices.",
};

const HomePage = async () => {
  const settingsData = await settingsGetAction("homepage");
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
