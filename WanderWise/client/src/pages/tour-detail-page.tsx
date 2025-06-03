import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import TourGallery from "@/components/tours/tour-gallery";
import TourBookingForm from "@/components/tours/tour-booking-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tour } from "@shared/schema";
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
  X,
} from "lucide-react";

const TourDetailPage = () => {
  const params = useParams();
  const [_, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const {
    data: tour,
    isLoading,
    error,
  } = useQuery<Tour, Error>({
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
            <h1 className="text-2xl font-bold mb-2">Không Tìm Thấy Tour</h1>
            <p className="text-muted-foreground mb-6">
              Tour bạn đang tìm kiếm không tồn tại hoặc hiện không có sẵn.
            </p>
            <Button onClick={() => navigate("/tours")}>
              Quay Lại Trang Tours
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {isLoading ? "Đang Tải Tour..." : `${tour.title} | WanderWise`}
        </title>
        <meta
          name="description"
          content={
            isLoading
              ? "Đang tải thông tin chi tiết về tour..."
              : tour.description
          }
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
                    <Link href="/" className="hover:text-primary">
                      Trang chủ
                    </Link>
                    <span className="mx-2">›</span>
                    <Link href="/tours" className="hover:text-primary">
                      Tours
                    </Link>
                    <span className="mx-2">›</span>
                    <Link
                      href={`/tours?destination=${encodeURIComponent(
                        tour.destination
                      )}`}
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
                          <span className="ml-1 font-medium">
                            {tour.rating?.toFixed(1)}
                          </span>
                        </div>{" "}
                        <span className="ml-1 text-muted-foreground">
                          ({tour.reviewCount} đánh giá)
                        </span>
                        <span className="mx-3 text-gray-300">|</span>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>
                            {tour.destination}, {tour.destinationCountry}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-2" />
                        <span>Lưu</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        <span>Chia sẻ</span>
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
                      <Tabs
                        defaultValue="overview"
                        value={activeTab}
                        onValueChange={setActiveTab}
                      >
                        <div className="border-b border-gray-200 overflow-x-auto">
                          <TabsList className="bg-transparent h-auto p-0">
                            <TabsTrigger
                              value="overview"
                              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                            >
                              Tổng quan
                            </TabsTrigger>
                            <TabsTrigger
                              value="itinerary"
                              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                            >
                              Lịch trình
                            </TabsTrigger>
                            <TabsTrigger
                              value="details"
                              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                            >
                              Bao gồm/Không bao gồm
                            </TabsTrigger>
                            <TabsTrigger
                              value="location"
                              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                            >
                              Địa điểm
                            </TabsTrigger>
                            <TabsTrigger
                              value="reviews"
                              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-3"
                            >
                              Đánh giá
                            </TabsTrigger>
                          </TabsList>
                        </div>

                        <div className="p-6">
                          <TabsContent value="overview" className="m-0 mt-0">
                            <div className="mb-6">
                              <h2 className="text-2xl font-bold font-poppins text-foreground mb-4">
                                Tổng quan tour
                              </h2>
                              <p className="text-muted-foreground mb-4">
                                {tour.description}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">
                                  Thời gian
                                </h3>
                                <p className="text-muted-foreground">
                                  {tour.duration} ngày
                                </p>
                              </div>
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">
                                  Quy mô đoàn
                                </h3>
                                <p className="text-muted-foreground">
                                  Tối đa {tour.capacity} người
                                </p>
                              </div>
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <Languages className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">
                                  Ngôn ngữ
                                </h3>
                                <p className="text-muted-foreground">
                                  Tiếng Anh
                                </p>
                              </div>
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <Activity className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">
                                  Mức độ hoạt động
                                </h3>
                                <p className="text-muted-foreground">
                                  Trung bình
                                </p>
                              </div>
                            </div>

                            <div className="mb-8">
                              <h2 className="text-2xl font-bold font-poppins text-foreground mb-4">
                                Điểm nổi bật
                              </h2>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {tour.itinerary
                                  .slice(0, 6)
                                  .map((item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start"
                                    >
                                      <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                      <span className="text-muted-foreground">
                                        {item.split(":")[1] || item}
                                      </span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </TabsContent>

                          <TabsContent value="itinerary" className="m-0 mt-0">
                            <h2 className="text-2xl font-bold font-poppins text-foreground mb-4">
                              Lịch trình chi tiết
                            </h2>
                            <div className="border-l-2 border-primary pl-6 space-y-6">
                              {tour.itinerary.map((item, index) => {
                                const dayMatch = item.match(/Day (\d+):/);
                                const day = dayMatch
                                  ? dayMatch[1]
                                  : String(index + 1);
                                const content = item
                                  .replace(/Day \d+:/, "")
                                  .trim();

                                return (
                                  <div key={index}>
                                    <div className="flex items-center mb-2">
                                      <div className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                                        Ngày {day}
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
                                  Bao gồm
                                </h2>
                                <ul className="space-y-3">
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Hướng dẫn viên tiếng Anh chuyên nghiệp
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      {tour.duration - 1} đêm lưu trú theo quy
                                      định
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Phương tiện di chuyển:{" "}
                                      {tour.transportation}
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Bữa ăn:{" "}
                                      {tour.includesFood
                                        ? "Bữa sáng hàng ngày và các bữa ăn được chọn theo lịch trình"
                                        : "Không bao gồm"}
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Tất cả phí vào cổng cho các điểm tham quan
                                      được đề cập trong lịch trình
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Hỗ trợ khách hàng 24/7 trong suốt chuyến
                                      đi
                                    </span>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <h2 className="text-xl font-bold font-poppins text-foreground mb-4">
                                  Những gì không bao gồm
                                </h2>
                                <ul className="space-y-3">
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Vé máy bay quốc tế đến/đi{" "}
                                      {tour.destination}
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Bảo hiểm du lịch (khuyến nghị cao)
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Các bữa ăn không được đề cập trong lịch
                                      trình
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Hoạt động tùy chọn hoặc chi phí cá nhân
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Phí visa (nếu có)
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      Tiền tip cho hướng dẫn viên và tài xế
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="mt-8">
                              <h2 className="text-xl font-bold font-poppins text-foreground mb-4">
                                Chi tiết về chỗ ở & phương tiện di chuyển
                              </h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="border border-border rounded-lg p-4">
                                  <div className="flex items-start mb-3">
                                    <Building className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                      <h3 className="font-medium text-foreground mb-1">
                                        Chỗ ở
                                      </h3>
                                      <p className="text-sm text-muted-foreground">
                                        {tour.accommodation ||
                                          "Khách sạn thoải mái được chọn vì vị trí và đặc điểm"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="border border-border rounded-lg p-4">
                                  <div className="flex items-start mb-3">
                                    <Bus className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                      <h3 className="font-medium text-foreground mb-1">
                                        Phương tiện di chuyển
                                      </h3>
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
                                      <h3 className="font-medium text-foreground mb-1">
                                        Bữa ăn
                                      </h3>
                                      <p className="text-sm text-muted-foreground">
                                        {tour.includesFood
                                          ? "Bữa sáng hàng ngày và các bữa ăn được chọn theo lịch trình"
                                          : "Không bao gồm bữa ăn, cho bạn sự linh hoạt để khám phá ẩm thực địa phương"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="location" className="m-0 mt-0">
                            <h2 className="text-2xl font-bold font-poppins text-foreground mb-4">
                              Địa điểm tour
                            </h2>
                            <div className="mb-4">
                              <p className="text-muted-foreground mb-4">
                                Tour này diễn ra tại {tour.destination},{" "}
                                {tour.destinationCountry}. Bạn sẽ tham quan
                                nhiều địa điểm khác nhau như đã nêu trong lịch
                                trình.
                              </p>
                            </div>
                            <div className="bg-gray-200 rounded-xl h-64 md:h-96 flex items-center justify-center">
                              <div className="text-center">
                                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                <p className="text-foreground font-medium">
                                  Bản đồ tương tác không khả dụng
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Vui lòng tham khảo lịch trình để biết chi tiết
                                  về địa điểm
                                </p>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="reviews" className="m-0 mt-0">
                            <div className="flex justify-between items-center mb-6">
                              {" "}
                              <h2 className="text-2xl font-bold font-poppins text-foreground">
                                Đánh giá của khách hàng
                              </h2>
                              <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                                <Star className="h-5 w-5 text-accent fill-current mr-1" />
                                <span className="font-semibold">
                                  {tour.rating?.toFixed(1)}
                                </span>
                                <span className="text-muted-foreground text-sm ml-1">
                                  ({tour.reviewCount} đánh giá)
                                </span>
                              </div>
                            </div>

                            <div className="text-center py-8">
                              <p className="text-muted-foreground">
                                Đánh giá sẽ sớm được cập nhật.
                              </p>
                              <Button className="mt-4" variant="outline">
                                Hãy là người đầu tiên viết đánh giá
                              </Button>
                            </div>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <TourBookingForm tour={tour as Tour} />
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
