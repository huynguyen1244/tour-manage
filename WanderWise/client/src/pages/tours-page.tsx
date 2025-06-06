import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import TourCard from "@/components/tours/tour-card";
import SearchForm from "@/components/ui/search-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Filter,
  ArrowUpDown,
  SlidersHorizontal,
  X,
} from "lucide-react";

const ToursPage = () => {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1] || "");

  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  // Get search parameters
  const dates = searchParams.get("dates") || "";
  const travelers = searchParams.get("travelers") || "2";

  // Fetch tours with search parameters
  const {
    data: tours,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/tours/search", destination],
    queryFn: async ({ queryKey }) => {
      const [_, destinationSearch] = queryKey;
      const response = await fetch(
        `/api/tours/search?destination=${encodeURIComponent(
          destinationSearch || ""
        )}`
      );
      if (!response.ok) {
        throw new Error("Không thể tải các tour");
      }
      return response.json();
    },
  });

  // Sort tours based on selection
  const sortedTours = tours
    ? [...tours].sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return (
              (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
            );
          case "price-high":
            return (
              (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
            );
          case "duration-short":
            return a.duration - b.duration;
          case "duration-long":
            return b.duration - a.duration;
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          default: // featured
            return b.featured ? 1 : -1;
        }
      })
    : [];

  // Update URL when destination changes
  useEffect(() => {
    if (destination) {
      searchParams.set("destination", destination);
    } else {
      searchParams.delete("destination");
    }
    // Update URL without page reload
    const newUrl =
      location.split("?")[0] +
      (searchParams.toString() ? `?${searchParams.toString()}` : "");
    window.history.replaceState(null, "", newUrl);
  }, [destination]);

  return (
    <>
      {" "}
      <Helmet>
        <title>Tours | WanderWise</title>
        <meta
          name="description"
          content="Khám phá đa dạng các tour du lịch của chúng tôi và tìm cuộc phiêu lưu hoàn hảo cho bạn."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className="bg-primary text-white py-12">
            <div className="container mx-auto px-4">
              {" "}
              <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                {destination
                  ? `Tours tại ${destination}`
                  : "Khám Phá Các Tour Của Chúng Tôi"}
              </h1>
              <p className="text-lg opacity-90 mb-6">
                Khám phá những trải nghiệm du lịch tuyệt vời được tạo ra bởi các
                chuyên gia của chúng tôi
              </p>
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                <SearchForm
                  defaultDestination={destination}
                  defaultDates={dates}
                  defaultTravelers={travelers}
                  compact={true}
                />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl font-semibold font-poppins">
                  {isLoading ? (
                    <Skeleton className="h-7 w-40" />
                  ) : error ? (
                    "Lỗi khi tải tours"
                  ) : (
                    `${sortedTours.length} ${
                      sortedTours.length === 1 ? "Tour" : "Tours"
                    } ${destination ? `tại ${destination}` : "Có Sẵn"}`
                  )}
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {" "}
                <Button
                  variant="outline"
                  size="sm"
                  className="sm:hidden"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Bộ Lọc & Sắp Xếp
                </Button>
                <div
                  className={`sm:flex items-center gap-3 ${
                    filterOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <div className="bg-background p-2 rounded-lg border border-border flex items-center mb-3 sm:mb-0">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm mr-2">Điểm đến:</span>
                    <span className="font-medium truncate max-w-[100px]">
                      {destination || "Tất cả"}
                    </span>
                    {destination && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 ml-1"
                        onClick={() => setDestination("")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm mr-2">Sắp xếp theo:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px] h-9 text-sm">
                        <SelectValue placeholder="Sắp xếp theo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Nổi bật</SelectItem>
                        <SelectItem value="price-low">
                          Giá: Thấp đến cao
                        </SelectItem>
                        <SelectItem value="price-high">
                          Giá: Cao đến thấp
                        </SelectItem>
                        <SelectItem value="duration-short">
                          Thời gian: Ngắn nhất
                        </SelectItem>
                        <SelectItem value="duration-long">
                          Thời gian: Dài nhất
                        </SelectItem>
                        <SelectItem value="rating">
                          Đánh giá cao nhất
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6)
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
                  ))}
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <div className="text-red-500 mb-4">
                  Không thể tải các tour. Vui lòng thử lại sau.
                </div>
                <Button onClick={() => window.location.reload()}>
                  Làm Mới
                </Button>
              </div>
            ) : sortedTours.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">
                  Không tìm thấy tour nào
                </h3>
                <p className="text-muted-foreground mb-6">
                  Chúng tôi không thể tìm thấy tour nào khớp với tiêu chí tìm
                  kiếm của bạn.
                </p>
                <Button onClick={() => setDestination("")}>
                  Xem Tất Cả Tour
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ToursPage;
