import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Calendar, Users, Search } from "lucide-react";

const HeroSection = () => {
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [capacity, setcapacity] = useState("1");
  const [_, setLocation] = useLocation();

  const handleSearch = (e: any) => {
    e.preventDefault();

    // Build query string for search - mapping to backend filter parameters
    const searchParams = new URLSearchParams();

    // Map destination to location filter
    if (destination) {
      searchParams.set("location", destination);
    }

    // Handle date range - split into start_date and end_date
    if (dateRange) {
      // Assuming dateRange format is "YYYY-MM-DD to YYYY-MM-DD" or similar
      const dates = dateRange.split(" to ");
      if (dates.length === 2) {
        searchParams.set("start_date", dates[0]);
        searchParams.set("end_date", dates[1]);
      } else {
        // If single date, use it as start_date
        searchParams.set("start_date", dateRange);
      }
    }

    // Map capacity to a custom parameter (since backend doesn't have direct capacity filter)
    if (capacity) {
      searchParams.set("capacity", capacity);
    }

    // Add default sorting
    searchParams.set("sort_by", "createdAt");
    searchParams.set("sort_order", "desc");

    // Only show active tours
    searchParams.set("is_active", "true");

    // Navigate to tours page with search params
    setLocation(`/tours?${searchParams.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 h-96 md:h-[32rem]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://puluongexcursions.com/wp-content/uploads/2023/03/vinh-ha-long-01.jpg"
          alt="Điểm đến du lịch"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="container mx-auto px-4 relative h-full">
        <div className="flex flex-col justify-center h-full max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-poppins mb-4">
            Khám Phá Những Tour Du Lịch Tuyệt Vời
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-8">
            Khám phá những điểm đến độc đáo với những trải nghiệm du lịch được
            tuyển chọn của chúng tôi
          </p>

          {/* Enhanced Search Form */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Điểm đến
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="destination"
                    className="pl-10"
                    placeholder="Bạn muốn đi đâu?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 md:w-40">
                <label
                  htmlFor="daterange"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Ngày khởi hành
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="daterange"
                    type="date"
                    className="pl-10"
                    placeholder="Chọn ngày"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 md:w-36">
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Khách
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                  <Select value={capacity} onValueChange={setcapacity}>
                    <SelectTrigger id="capacity" className="pl-10">
                      <SelectValue placeholder="Chọn số khách" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Người</SelectItem>
                      <SelectItem value="2">2 Người</SelectItem>
                      <SelectItem value="3">3 Người</SelectItem>
                      <SelectItem value="4">4+ Người</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:self-end">
                <Button
                  onClick={handleSearch}
                  className="w-full md:mt-6 bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
