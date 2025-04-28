import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Map,
  Star,
  Award,
  GlobeLock,
  Headphones,
  Clock,
  Smile,
} from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | TravelTour</title>
        <meta
          name="description"
          content="Learn about TravelTour - your trusted partner for exceptional travel experiences around the world."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div
          className="relative h-[300px] md:h-[400px] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-4 text-center">
              About TravelTour
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-center">
              Crafting unforgettable travel experiences since 2010
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="container mx-auto py-16 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2010, TravelTour began with a simple vision: to create authentic
                travel experiences that go beyond the ordinary tourist attractions and connect
                travelers with the heart and soul of each destination.
              </p>
              <p className="text-muted-foreground mb-4">
                What started as a small team of passionate travelers has grown into a global
                community of exploration enthusiasts. Our founders, Alex and Maria Rodriguez,
                both avid travelers themselves, noticed a gap in the market for immersive,
                culturally rich travel experiences that weren't just about checking landmarks
                off a list.
              </p>
              <p className="text-muted-foreground">
                Today, we offer curated tours to over 50 destinations worldwide, each
                carefully designed to provide an authentic and memorable experience. We're
                proud to have helped more than 50,000 travelers create lasting memories and
                connections around the globe.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Team members planning a trip"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Client consultation session"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Happy travelers on a tour"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Company celebration"
                className="rounded-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-muted py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
                Our Mission & Values
              </h2>
              <p className="text-muted-foreground">
                At TravelTour, we believe that travel has the power to transform lives,
                broaden perspectives, and create meaningful connections across cultures.
                Our mission is to facilitate these transformative experiences while ensuring
                that our operations positively impact the communities we visit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Map className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Authentic Experiences</h3>
                  <p className="text-muted-foreground">
                    We design itineraries that go beyond tourist spots to reveal the true
                    character and culture of each destination.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Community Impact</h3>
                  <p className="text-muted-foreground">
                    We partner with local businesses and guides to ensure our tours
                    contribute positively to the communities we visit.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <GlobeLock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Sustainable Travel</h3>
                  <p className="text-muted-foreground">
                    We're committed to minimizing our environmental footprint and promoting
                    responsible, sustainable tourism practices.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We strive for excellence in every aspect of our service, from itinerary
                    planning to on-the-ground support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="container mx-auto py-16 px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
              Why Choose TravelTour?
            </h2>
            <p className="text-muted-foreground">
              With thousands of travel companies to choose from, here's why travelers
              continue to trust us with their most precious moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Award-Winning Service</h3>
                <p className="text-muted-foreground">
                  Recognized with multiple industry awards for our exceptional service
                  and innovative tour designs.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Expert Local Guides</h3>
                <p className="text-muted-foreground">
                  Our guides are passionate locals with deep knowledge of their regions,
                  offering insights you won't find in guidebooks.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Smile className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">98% Customer Satisfaction</h3>
                <p className="text-muted-foreground">
                  We're proud of our consistently high ratings and the positive feedback
                  we receive from satisfied travelers.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Our dedicated support team is available around the clock to assist with
                  any questions or concerns during your journey.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Flexible Scheduling</h3>
                <p className="text-muted-foreground">
                  We offer a range of departure dates and can often accommodate custom
                  timing to fit your schedule.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Unique Itineraries</h3>
                <p className="text-muted-foreground">
                  Our carefully crafted itineraries blend popular highlights with hidden
                  gems for a truly unique travel experience.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Button size="lg">Browse Our Tours</Button>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-muted py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
                Meet Our Leadership Team
              </h2>
              <p className="text-muted-foreground">
                The passionate individuals behind TravelTour who work tirelessly to create
                exceptional travel experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Alex Rodriguez"
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">Alex Rodriguez</h3>
                  <p className="text-primary font-medium text-sm mb-2">Co-Founder & CEO</p>
                  <p className="text-muted-foreground text-sm">
                    A lifelong traveler who has visited over 70 countries, Alex leads our
                    company vision and strategic direction.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Maria Rodriguez"
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">Maria Rodriguez</h3>
                  <p className="text-primary font-medium text-sm mb-2">Co-Founder & COO</p>
                  <p className="text-muted-foreground text-sm">
                    With a background in cultural anthropology, Maria ensures our tours provide
                    authentic cultural immersion.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="David Chen"
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">David Chen</h3>
                  <p className="text-primary font-medium text-sm mb-2">Tour Director</p>
                  <p className="text-muted-foreground text-sm">
                    With 15 years of experience leading tours across Asia and Oceania, David
                    oversees our tour operations and guide training.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Sophia Martinez"
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">Sophia Martinez</h3>
                  <p className="text-primary font-medium text-sm mb-2">Sustainability Director</p>
                  <p className="text-muted-foreground text-sm">
                    A passionate environmentalist, Sophia leads our initiatives to minimize
                    our ecological footprint and promote responsible tourism.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;