import { Helmet } from 'react-helmet';
import HeroSection from "@/components/home/hero-section";
import PopularDestinations from "@/components/home/popular-destinations";
import FeaturedTours from "@/components/home/featured-tours";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>TravelTour - Discover Amazing Tours</title>
        <meta name="description" content="Discover amazing tours around the world with our curated travel experiences." />
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
