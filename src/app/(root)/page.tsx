import BannerSection from "./_components/BannerSection";
import FeaturedCategories from "./_components/FeaturedCategories";
import FeaturedProducts from "./_components/FeaturedProducts";
import FlashSaleSection from "./_components/FlashSaleSection";
import PopularProducts from "./_components/PopularProducts";
import ProductListsSection from "./_components/ProductListsSection";
import Services from "./_components/Services";

const HomePage = () => {
  return (
    <div className="mg-container">
      <BannerSection />
      <FeaturedCategories />
      <PopularProducts />
      <FeaturedProducts />
      <FlashSaleSection />
      <ProductListsSection />
      <Services />
    </div>
  );
};

export default HomePage;
