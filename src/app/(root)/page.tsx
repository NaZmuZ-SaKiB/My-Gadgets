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

const HomePage = async () => {
  const settingsData = await settingsGetAction();
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
      <ProductListsSection />
      <Services />
      <BranchesSection />
    </div>
  );
};

export default HomePage;
