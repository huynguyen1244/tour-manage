import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/hero-section";
import PopularDestinations from "@/components/home/popular-destinations";
import FeaturedTours from "@/components/home/featured-tours";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>WanderWise - Khám Phá Những Tour Du Lịch Tuyệt Vời</title>
        <meta
          name="description"
          content="Khám phá những tour du lịch tuyệt vời trên khắp thế giới với những trải nghiệm du lịch được tuyển chọn của chúng tôi."
        />
      </Helmet>

      <main>
        <HeroSection />
        <PopularDestinations />
        <FeaturedTours />
      </main>
    </>
  );
};

export default HomePage;
