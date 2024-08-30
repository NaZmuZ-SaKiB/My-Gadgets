import BannerSection from "./_components/BannerSection";
import FeaturedCategories from "./_components/FeaturedCategories";
import PopularProducts from "./_components/PopularProducts";

const HomePage = () => {
  return (
    <div className="mg-container">
      <BannerSection />
      <FeaturedCategories />
      <PopularProducts />
    </div>
  );
};

export default HomePage;
