import { useState, useEffect } from "react";
import { apiClient } from "@/services/axios";
import { Link } from "wouter";
import TourCard from "@/components/tours/tour-card";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Image {
  _id: string;
  url: string;
  public_id: string;
}

interface ItineraryItem {
  _id: string;
  day: string;
  description: string;
}

interface Tour {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  start_location: string;
  destinations: string[];
  price: number;
  available_slots: number;
  schedule: string;
  start_date: string;
  end_date: string;
  transport: string;
  includes: string[];
  excludes: string[];
  policies: string;
  itinerary: ItineraryItem[];
  images: Image[];
  status: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

const FeaturedTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await apiClient.get("/tours");
        setTours(response as any);
      } catch (error) {
        setError(true);
        console.error("Lỗi khi lấy tours:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            Lỗi khi tải danh sách tour nổi bật. Vui lòng thử lại sau.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-poppins text-foreground">
            Tour Nổi Bật
          </h2>
          <Link
            href="/tours"
            className="text-primary font-medium hover:underline flex items-center"
          >
            <span>Xem tất cả tour</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? // Skeleton loading state
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-md"
                  >
                    <Skeleton className="h-52 w-full" />
                    <div className="p-5">
                      <div className="flex items-center mb-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <div className="flex items-center ml-auto">
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-7 w-4/5 mb-2" />
                      <Skeleton className="h-4 w-32 mb-3" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-10 w-28 rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))
            : // Actual tours
              tours
                ?.sort(() => Math.random() - 0.5)
                ?.slice(0, 4)
                .map((tour) => <TourCard key={tour._id} {...tour} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
