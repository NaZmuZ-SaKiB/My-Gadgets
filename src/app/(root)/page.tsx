import BannerSection from "./_components/BannerSection";
import FeaturedCategories from "./_components/FeaturedCategories";
import FeaturedProducts from "./_components/FeaturedProducts";
import PopularProducts from "./_components/PopularProducts";

const HomePage = () => {
  return (
    <div className="mg-container">
      <BannerSection />
      <FeaturedCategories />
      <PopularProducts />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
