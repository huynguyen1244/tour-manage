import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { apiClient } from "@/services/axios";
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
import { MapPin, ArrowUpDown, SlidersHorizontal, X } from "lucide-react";

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

const ToursPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  const [filterOpen, setFilterOpen] = useState(false);
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

  const sortedTours = [...tours].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <>
      <Helmet>
        <title>Tours | WanderWise</title>
        <meta
          name="description"
          content="Khám phá đa dạng các tour du lịch của chúng tôi và tìm cuộc phiêu lưu hoàn hảo cho bạn."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* Banner */}
          <div
            className="relative h-[300px] md:h-[400px] w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://sakos.vn/wp-content/uploads/2024/05/mu-cang-chai2-2.jpeg')",
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-4 text-center">
                Khám Phá Những Trải Nghiệm Du Lịch Tuyệt Vời
              </h1>

              {/* <form
                onSubmit={handleSearch}
                className="w-full max-w-xl flex gap-2 items-center bg-white rounded-lg p-1"
              >
                <Input
                  type="text"
                  placeholder="Tìm kiếm danh mục..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow border-none focus:ring-0 text-foreground"
                />
                <Button type="submit" size="sm" className="px-4">
                  <Search className="h-4 w-4 mr-2" /> Tìm kiếm
                </Button>
              </form> */}
            </div>
          </div>

          {/* Filter + List */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
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
                  className={`${
                    filterOpen ? "block" : "hidden"
                  } sm:flex items-center gap-3`}
                >
                  <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm mr-2">Sắp xếp theo:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px] h-9 text-sm">
                        <SelectValue placeholder="Sắp xếp theo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price-low">
                          Giá: Thấp đến cao
                        </SelectItem>
                        <SelectItem value="price-high">
                          Giá: Cao đến thấp
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Tour list */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-md"
                  >
                    <Skeleton className="h-52 w-full" />
                    <div className="p-5">
                      <Skeleton className="h-5 w-16 rounded-full mb-2" />
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
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                  <TourCard key={tour._id} {...tour} />
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
