import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import DestinationCard from "@/components/tours/destination-card";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const PopularDestinations = () => {
  const { data: destinations, isLoading, error } = useQuery({
    queryKey: ["/api/destinations"],
  });

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            Error loading destinations. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-poppins text-foreground">
            Popular Destinations
          </h2>
          <Link
            href="/destinations"
            className="text-primary font-medium hover:underline flex items-center"
          >
            <span>View all destinations</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Skeleton loading state
            Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-md bg-white">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-24 mb-1" />
                    <Skeleton className="h-4 w-16" />
                    <div className="flex justify-between items-center mt-3">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                </div>
              ))
          ) : (
            // Actual destinations
            destinations?.slice(0, 4).map((destination: any) => (
              <DestinationCard
                key={destination.destination}
                destination={destination.destination}
                country={destination.country}
                image={destination.image}
                tourCount={destination.tourCount}
                rating={destination.rating}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
