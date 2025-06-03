import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type Destination = {
  destination: string;
  country: string;
  image: string;
  tourCount: number;
  rating: number;
};

const DestinationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState<
    Destination[]
  >([]);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  useEffect(() => {
    if (destinations) {
      setFilteredDestinations(
        destinations.filter(
          (dest) =>
            dest.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dest.country.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, destinations]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {" "}
      <Helmet>
        <title>Khám Phá Điểm Đến | WanderWise</title>
        <meta
          name="description"
          content="Khám phá những điểm đến tuyệt vời khắp thế giới và lên kế hoạch cho cuộc phiêu lưu tiếp theo của bạn."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header Banner */}
        <div
          className="relative h-[300px] md:h-[400px] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-4 text-center">
              Khám Phá Những Điểm Đến Tuyệt Vời
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-center mb-8">
              Khám phá những địa điểm ngoạn mục nhất thế giới và lên kế hoạch
              cho cuộc phiêu lưu tiếp theo của bạn
            </p>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="w-full max-w-xl flex gap-2 items-center bg-white rounded-lg p-1"
            >
              <Input
                type="text"
                placeholder="Tìm kiếm điểm đến..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow border-none focus:ring-0 text-foreground"
              />
              <Button type="submit" size="sm" className="px-4">
                <Search className="h-4 w-4 mr-2" /> Tìm kiếm
              </Button>
            </form>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="container mx-auto py-12 px-4">
          {" "}
          <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-8">
            Điểm Đến Phổ Biến
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDestinations.map((destination, index) => (
                <Card
                  key={index}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  ></div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {destination.destination}
                        </h3>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{destination.country}</span>
                        </div>
                      </div>
                      <div className="bg-primary/10 text-primary font-medium text-sm py-1 px-2 rounded">
                        {destination.rating}/5
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {destination.tourCount} tours available
                      </span>
                      <Button variant="outline" size="sm">
                        Explore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {filteredDestinations.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No destinations found matching "{searchTerm}"
              </p>
              <Button
                variant="link"
                onClick={() => setSearchTerm("")}
                className="mt-2"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>

        {/* Featured Content */}
        <div className="bg-muted py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
                  Du lịch đến những địa điểm kỳ lạ nhất thế giới
                </h2>
                <p className="text-muted-foreground mb-6">
                  Du lịch đến thế giới, các hướng dẫn viên chuyên nghiệp của
                  chúng tôi sẽ đưa bạn đến những hành trình không thể quên đến
                  những viên ngọc ẩn giấu và các địa điểm biểu tượng. Trải
                  nghiệm các nền văn hóa, ẩm thực và truyền thống địa phương độc
                  đáo trong khi tận hưởng chỗ ở cao cấp và các sắp xếp du lịch
                  liền mạch.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="bg-primary/20 p-1 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Expert local guides with insider knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/20 p-1 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>
                      Chuyến tham quan theo nhóm nhỏ để có trải nghiệm cá nhân
                      hóa
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/20 p-1 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>
                      Chỗ ở được chọn lọc với phong cách và sự thoải mái
                    </span>
                  </li>
                </ul>
                <Button className="mt-2">Browse All Tours</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Travel destination"
                    className="rounded-lg h-40 w-full object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Travel destination"
                    className="rounded-lg h-56 w-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1519922639192-e73293ca430e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Travel destination"
                    className="rounded-lg h-56 w-full object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Travel destination"
                    className="rounded-lg h-40 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationsPage;
