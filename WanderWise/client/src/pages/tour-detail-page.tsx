import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import TourGallery from "@/components/tours/tour-gallery";
import TourBookingForm from "@/components/tours/tour-booking-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  MapPin, 
  Heart, 
  Share2, 
  Clock, 
  Users, 
  Languages, 
  Activity, 
  CheckCircle, 
  Bus, 
  Building, 
  Coffee,
  X
} from "lucide-react";

const TourDetailPage = () => {
  const params = useParams();
  const [_, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: tour, isLoading, error } = useQuery({
    queryKey: [`/api/tours/${params.id}`],
  });
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <div className="bg-red-100 text-red-600 rounded-full p-3 inline-block mb-4">
              <X className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Tour Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The tour you're looking for couldn't be found or isn't available.
            </p>
            <Button onClick={() => navigate("/tours")}>
              Back to Tours
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{isLoading ? "Loading Tour..." : `${tour.title} | TravelTour`}</title>
        <meta 
          name="description" 
          content={isLoading ? "Loading tour details..." : tour.description} 
        />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {isLoading ? (
            <TourDetailSkeleton />
          ) : (
            <section className="py-12 bg-white">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <span className="mx-2">›</span>
                    <Link href="/tours" className="hover:text-primary">Tours</Link>
                    <span className="mx-2">›</span>
                    <Link 
                      href={`/tours?destination=${encodeURIComponent(tour.destination)}`} 
                      className="hover:text-primary"
                    >
                      {tour.destination}
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="text-foreground">{tour.title}</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                        {tour.title}
                      </h1>
                      <div className="flex flex-wrap items-center mt-2">
                        <div className="flex items-center text-accent">
                          <Star className="h-5 w-5 fill-current" />
                          <span className="ml-1 font-medium">{tour.rating?.toFixed(1)}</span>
                        </div>
                        <span className="ml-1 text-muted-foreground">
                          ({tour.reviewCount} reviews)
                        </span>
                        <span className="mx-3 text-gray-300">|</span>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{tour.destination}, {tour.destinationCountry}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-2" />
                        <span>Save</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <TourGallery 
                  images={tour.galleryImages || [tour.image]} 
                  title={tour.title} 
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm mb-8">
                      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                        <div className="border-b border-gray-200 overflow-x-auto">
                          <TabsList className="bg-transparent h-auto p-0">
                            <TabsTrigger
                              value="overview"
                              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                            >
                              Overview
                            </TabsTrigger>
                            <TabsTrigger
                              value="itinerary"
                              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                            >
                              Itinerary
                            </TabsTrigger>
                            <TabsTrigger
                              value="details"
                              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                            >
                              Included/Excluded
                            </TabsTrigger>
                            <TabsTrigger
                              value="location"
                              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                            >
                              Location
                            </TabsTrigger>
                            <TabsTrigger
                              value="reviews"
                              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                            >
                              Reviews
                            </TabsTrigger>
                          </TabsList>
                        </div>

                        <div className="p-6">
                          <TabsContent value="overview" className="m-0 mt-0">
                            <div className="mb-6">
                              <h2 className="text-2xl font-bold font-poppins text-foreground mb-4">
                                Tour Overview
                              </h2>
                              <p className="text-muted-foreground mb-4">
                                {tour.description}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">Duration</h3>
                                <p className="text-muted-foreground">{tour.duration} days</p>
                              </div>
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">Group Size</h3>
                                <p className="text-muted-foreground">Max {tour.capacity} people</p>
                              </div>
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <Languages className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">Languages</h3>
                                <p className="text-muted-foreground">English</p>
                              </div>
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <Activity className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">Activity Level</h3>
                                <p className="text-muted-foreground">Moderate</p>
                              </div>
                            </div>

                            <div className="mb-8">
                              <h2 className="text-2xl font-bold font-poppins text-foreground mb-4">
                                Highlights
                              </h2>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {tour.itinerary.slice(0, 6).map((item, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      {item.split(':')[1] || item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </TabsContent>

                          <TabsContent value="itinerary" className="m-0 mt-0">
                            <h2 className="text-2xl font-bold font-poppins text-foreground mb-4">
                              Detailed Itinerary
                            </h2>
                            <div className="border-l-2 border-primary pl-6 space-y-6">
                              {tour.itinerary.map((item, index) => {
                                const dayMatch = item.match(/Day (\d+):/);
                                const day = dayMatch ? dayMatch[1] : String(index + 1);
                                const content = item.replace(/Day \d+:/, '').trim();
                                
                                return (
                                  <div key={index}>
                                    <div className="flex items-center mb-2">
                                      <div className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                                        Day {day}
                                      </div>
                                    </div>
                                    <p className="text-muted-foreground">
                                      {content}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </TabsContent>

                          <TabsContent value="details" className="m-0 mt-0">
                            <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                <h2 className="text-xl font-bold font-poppins text-foreground mb-4">
                                  What's Included
                                </h2>
                                <ul className="space-y-3">
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Professional English-speaking tour guide
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      {tour.duration - 1} nights accommodation as specified
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Transportation: {tour.transportation}
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Meals: {tour.includesFood ? "Breakfast daily and select meals as per itinerary" : "None included"}
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      All entrance fees to attractions mentioned in the itinerary
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      24/7 customer support during the tour
                                    </span>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <h2 className="text-xl font-bold font-poppins text-foreground mb-4">
                                  What's Not Included
                                </h2>
                                <ul className="space-y-3">
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      International airfare to/from {tour.destination}
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Travel insurance (highly recommended)
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Meals not specified in the itinerary
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Optional activities or personal expenses
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Visa fees (if applicable)
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Tips for guides and drivers
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="mt-8">
                              <h2 className="text-xl font-bold font-poppins text-foreground mb-4">
                                Accommodation & Transport Details
                              </h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="border border-border rounded-lg p-4">
                                  <div className="flex items-start mb-3">
                                    <Building className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                      <h3 className="font-medium text-foreground mb-1">Accommodation</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {tour.accommodation || "Comfortable hotels selected for location and character"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="border border-border rounded-lg p-4">
                                  <div className="flex items-start mb-3">
                                    <Bus className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                      <h3 className="font-medium text-foreground mb-1">Transportation</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {tour.transportation}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="border border-border rounded-lg p-4">
                                  <div className="flex items-start mb-3">
                                    <Coffee className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                      <h3 className="font-medium text-foreground mb-1">Meals</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {tour.includesFood ? 
                                          "Daily breakfast and select meals included as per itinerary" : 
                                          "Meals not included, giving you flexibility to explore local cuisine"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="location" className="m-0 mt-0">
                            <h2 className="text-2xl font-bold font-poppins text-foreground mb-4">
                              Tour Location
                            </h2>
                            <div className="mb-4">
                              <p className="text-muted-foreground mb-4">
                                This tour takes place in {tour.destination}, {tour.destinationCountry}. 
                                You'll visit various locations as outlined in the itinerary.
                              </p>
                            </div>
                            <div className="bg-gray-200 rounded-xl h-64 md:h-96 flex items-center justify-center">
                              <div className="text-center">
                                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                <p className="text-foreground font-medium">Interactive map unavailable</p>
                                <p className="text-sm text-muted-foreground">
                                  Please refer to the itinerary for location details
                                </p>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="reviews" className="m-0 mt-0">
                            <div className="flex justify-between items-center mb-6">
                              <h2 className="text-2xl font-bold font-poppins text-foreground">
                                Guest Reviews
                              </h2>
                              <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                                <Star className="h-5 w-5 text-accent fill-current mr-1" />
                                <span className="font-semibold">{tour.rating?.toFixed(1)}</span>
                                <span className="text-muted-foreground text-sm ml-1">
                                  ({tour.reviewCount} reviews)
                                </span>
                              </div>
                            </div>
                            
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">
                                Reviews will be available soon.
                              </p>
                              <Button className="mt-4" variant="outline">
                                Be the first to write a review
                              </Button>
                            </div>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <TourBookingForm tour={tour} />
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
};

// Loading skeleton for tour detail page
const TourDetailSkeleton = () => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <div className="flex flex-wrap items-center text-sm mb-4">
          <Skeleton className="h-4 w-16 mr-2" />
          <Skeleton className="h-4 w-4 mx-2" />
          <Skeleton className="h-4 w-16 mr-2" />
          <Skeleton className="h-4 w-4 mx-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-10 w-72 mb-2" />
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2 rounded-xl overflow-hidden h-80 md:h-96">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="w-full h-full rounded-xl" />
          <Skeleton className="w-full h-full rounded-xl" />
          <Skeleton className="w-full h-full rounded-xl" />
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <div className="flex px-1 py-3">
                <Skeleton className="h-8 w-20 mx-2" />
                <Skeleton className="h-8 w-20 mx-2" />
                <Skeleton className="h-8 w-20 mx-2" />
                <Skeleton className="h-8 w-20 mx-2" />
              </div>
            </div>

            <div className="p-6">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
              
              <Skeleton className="h-8 w-40 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Skeleton className="h-[450px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  </section>
);

export default TourDetailPage;
