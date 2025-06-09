import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import TourGallery from "@/components/tours/tour-gallery";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  MapPin,
  Heart,
  Share2,
  Clock,
  Users,
  CheckCircle,
  Bus,
  X,
  Ticket,
  Pencil,
  Send,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

import { apiClient } from "@/services/axios";

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
  capacity: number;
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

interface Review {
  user_id: any;
  tour_id: any;
  rating: number;
  comment: String;
  review_date: Date;
}

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  onHover?: (rating: number) => void;
  onLeave?: () => void;
  interactive?: boolean;
  size?: string;
}

const TourDetailPage = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [_, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [tour, setTour] = useState<any>(null);
  const [reviews, setReviews] = useState<any>(null);
  const [newRating, setNewRating] = useState<number>(5);
  const [newReview, setNewReview] = useState<string>("");
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [error, setError] = useState(false);
  const [isLoading] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await apiClient.get(`/tours/${id}`);
        setTour(response as any);
        const reviews = await apiClient.get(
          `/reviews/${(response as any)._id}`
        );
        setReviews(reviews);
        setError(false);
      } catch (err) {
        setError(true);
      }
    };

    if (id) fetchTour();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const averageRating: number =
    !reviews || reviews.length === 0
      ? 0
      : reviews.reduce((acc: number, curr: Review) => acc + curr.rating, 0) /
        reviews.length;

  const handleSubmit = (): void => {
    if (!newReview.trim() || newReview.length < 10) return;
    setReviews([
      {
        rating: newRating,
        comment: newReview,
        date: new Date().toISOString().split("T")[0],
      },
      ...reviews,
    ]);
    setNewReview("");
    setNewRating(5);
    setHoverRating(0);
  };

  const StarRating: React.FC<StarRatingProps> = ({
    rating,
    onRatingChange,
    onHover,
    onLeave,
    interactive = true,
    size = "w-5 h-5",
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} transition-all duration-200 ${
              interactive ? "cursor-pointer hover:scale-110" : ""
            } ${
              star <= (hoverRating || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() =>
              interactive && onRatingChange && onRatingChange(star)
            }
            onMouseEnter={() => interactive && onHover && onHover(star)}
            onMouseLeave={() => interactive && onLeave && onLeave()}
          />
        ))}
      </div>
    );
  };

  const getRatingDistribution = (): number[] => {
    const distribution: number[] = [0, 0, 0, 0, 0];

    if (!reviews || reviews.length === 0) return distribution;

    reviews.forEach((review: Review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating - 1]++;
      }
    });

    return distribution;
  };

  const ratingDistribution: number[] = getRatingDistribution();

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

  if (!tour) return <div className="p-4">Đang tải thông tin tour...</div>;
  return (
    <>
      <Helmet>
        <title>
          {isLoading || !tour
            ? "Đang Tải Tour..."
            : `${tour.name} | WanderWise`}
        </title>
        <meta
          name="description"
          content={
            isLoading || !tour
              ? "Đang tải thông tin chi tiết về tour..."
              : tour.description
          }
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {isLoading || !tour ? (
            <TourDetailSkeleton />
          ) : (
            <section className="py-12 bg-white">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4">
                    <Link href="/" className="hover:text-primary">
                      Trang chủ
                    </Link>
                    <span className="mx-2">›</span>{" "}
                    <Link href="/tours" className="hover:text-primary">
                      Du Lịch
                    </Link>
                    <span className="mx-2">›</span>{" "}
                    <Link
                      href={`/tours?location=${encodeURIComponent(
                        tour.location || ""
                      )}`}
                      className="hover:text-primary"
                    >
                      {tour.location || ""}
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="text-foreground">{tour.name || ""}</span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                        {tour.name || ""}
                      </h1>
                      <div className="flex flex-wrap items-center mt-2">
                        <span className="mx-3 text-gray-300">|</span>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>
                            {tour.location || ""}, {tour.destinations || ""}
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
                  images={[tour.images || ""]}
                  title={tour.name || ""}
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
                              <p className="text-muted-foreground mb-4 text-lg">
                                {tour.description || ""}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">
                                  Thời gian
                                </h3>
                                <p className="text-muted-foreground">
                                  {tour.schedule || 0}
                                </p>
                              </div>
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">
                                  Địa điểm xuất phát
                                </h3>
                                <p className="text-muted-foreground">
                                  {tour.start_location || 0}
                                </p>
                              </div>
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">
                                  Quy mô đoàn
                                </h3>
                                <p className="text-muted-foreground">
                                  Tối đa {tour.capacity || 0} người
                                </p>
                              </div>
                              <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <Ticket className="h-6 w-6 text-primary mx-auto mb-2" />
                                <h3 className="font-medium text-foreground">
                                  Số slot khả dụng
                                </h3>
                                <p className="text-muted-foreground">
                                  Còn {tour.available_slots || 0} slot
                                </p>
                              </div>
                            </div>

                            <div className="mb-8">
                              <h2 className="text-2xl font-bold font-poppins text-foreground mb-4">
                                Các địa điểm tham quan
                              </h2>
                              <ul className="gap-3">
                                {(tour.destinations || []).map(
                                  (item: string, index: number) => (
                                    <li
                                      key={index}
                                      className="flex items-start"
                                    >
                                      <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                      <span className="text-muted-foreground text-lg">
                                        {item}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </TabsContent>

                          <TabsContent value="itinerary" className="m-0 mt-0">
                            <h2 className="text-2xl font-bold font-poppins text-foreground mb-4">
                              Lịch trình chi tiết
                            </h2>
                            <p className="text-muted-foreground text-lg pb-6">
                              {"Tour bắt đầu từ " +
                                formatDate(tour.start_date) +
                                " đến " +
                                formatDate(tour.end_date)}
                            </p>
                            <div className="border-l-2 border-primary pl-6 space-y-6">
                              {(tour.itinerary || []).map(
                                (item: any, index: any) => {
                                  return (
                                    <div key={index}>
                                      <div className="flex items-center mb-2">
                                        <div className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                                          {item.day}
                                        </div>
                                      </div>
                                      <p className="text-muted-foreground">
                                        {item.description}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </TabsContent>

                          <TabsContent value="details" className="m-0 mt-0">
                            <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                <h2 className="text-xl font-bold font-poppins text-foreground mb-4">
                                  Bao gồm
                                </h2>
                                <ul className="space-y-3">
                                  {(tour.includes || []).map(
                                    (item: string, index: number) => (
                                      <li
                                        key={index}
                                        className="flex items-start"
                                      >
                                        <CheckCircle className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                                        <span className="text-muted-foreground text-lg">
                                          {item}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <div>
                                <h2 className="text-xl font-bold font-poppins text-foreground mb-4">
                                  Những gì không bao gồm
                                </h2>
                                <ul className="space-y-3">
                                  {(tour.includes || []).map(
                                    (item: string, index: number) => (
                                      <li
                                        key={index}
                                        className="flex items-start"
                                      >
                                        <X className="h-5 w-5 text-destructive mt-0.5 mr-2 flex-shrink-0" />{" "}
                                        <span className="text-muted-foreground text-lg">
                                          {item}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>

                            <div className="mt-8">
                              <h2 className="text-xl font-bold font-poppins text-foreground mb-4">
                                Phương tiện di chuyển
                              </h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                {/* <div className="border border-border rounded-lg p-4">
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
                                </div> */}
                                <div className="border border-border rounded-lg p-4">
                                  <div className="flex items-start mb-3">
                                    <Bus className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                      <h3 className="font-medium text-foreground mb-1">
                                        Phương tiện di chuyển
                                      </h3>{" "}
                                      <p className="text-sm text-muted-foreground">
                                        {tour.transport || "Sẽ thông báo"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="border border-border rounded-lg p-4">
                                  <div className="flex items-start mb-3">
                                    <Coffee className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                      <h3 className="font-medium text-foreground mb-1">
                                        Bữa ăn
                                      </h3>{" "}
                                      <p className="text-sm text-muted-foreground">
                                        {tour.includesFood
                                          ? "Bữa sáng hàng ngày và các bữa ăn được chọn theo lịch trình"
                                          : "Không bao gồm bữa ăn, cho bạn sự linh hoạt để khám phá ẩm thực địa phương"}
                                      </p>
                                    </div>
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="location" className="m-0 mt-0">
                            <h2 className="text-2xl font-bold font-poppins text-foreground mb-4">
                              Địa điểm tour
                            </h2>
                            <div className="mb-4">
                              {" "}
                              <p className="text-muted-foreground mb-4">
                                Tour này diễn ra tại{" "}
                                {tour.location || "điểm đến"}. Bạn sẽ tham quan
                                nhiều địa điểm khác nhau như đã nêu trong lịch
                                trình.
                              </p>
                            </div>
                            <div className="bg-gray-200 rounded-xl h-64 md:h-96 flex items-center justify-center text-center">
                              {tour.images && tour.images.length > 0 && (
                                <img
                                  className="w-full h-full object-cover rounded-xl"
                                  src={tour.images[tour.images.length - 1].url}
                                  alt="Ảnh cuối cùng của tour"
                                />
                              )}
                            </div>
                          </TabsContent>

                          <TabsContent value="reviews" className="m-0 mt-0">
                            <div className="mb-12">
                              {/* Header */}
                              <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                  Đánh giá của khách hàng
                                </h2>
                                <p className="text-gray-600">
                                  Chia sẻ từ những khách hàng đã trải nghiệm
                                </p>
                              </div>

                              {/* Grid layout: Thống kê và Đánh giá gần đây */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Cột 1: Thống kê đánh giá */}
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                                  <div className="flex flex-col items-center text-center mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                                      <span className="text-3xl font-bold text-gray-800">
                                        {averageRating.toFixed(1)}
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      <span className="font-medium">
                                        {reviews?.length ?? 0} đánh giá
                                      </span>
                                    </div>
                                  </div>

                                  {/* Rating distribution */}
                                  {
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                        Phân bố đánh giá
                                      </h4>
                                      <div className="space-y-2">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                          <div
                                            key={rating}
                                            className="flex items-center gap-3"
                                          >
                                            <span className="text-sm text-gray-600 w-6">
                                              {rating}★
                                            </span>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                              <div
                                                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                                style={{
                                                  width: `${
                                                    reviews?.length > 0
                                                      ? (ratingDistribution[
                                                          rating - 1
                                                        ] /
                                                          reviews.length) *
                                                        100
                                                      : 0
                                                  }%`,
                                                }}
                                              />
                                            </div>
                                            <span className="text-sm text-gray-600 w-8">
                                              {ratingDistribution[rating - 1]}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  }
                                </div>

                                {/* Cột 2: Đánh giá gần đây */}
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                                  <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-5 h-5 text-purple-500" />
                                    <h4 className="text-lg font-semibold text-gray-800">
                                      Đánh giá gần đây
                                    </h4>
                                  </div>

                                  {!reviews || reviews.length === 0 ? (
                                    <div className="text-center py-8">
                                      <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                      <p className="text-gray-600 font-medium mb-2">
                                        Chưa có đánh giá nào
                                      </p>
                                      <p className="text-gray-500 text-sm">
                                        Hãy là người đầu tiên chia sẻ!
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="space-y-3 max-h-80 overflow-y-auto">
                                      {reviews
                                        .slice(0, 3)
                                        .map(
                                          (review: Review, index: number) => (
                                            <div
                                              key={index}
                                              className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm space-y-2"
                                            >
                                              {/* Phần tiêu đề: tên người dùng, ngày đánh giá, sao */}
                                              <div className="flex items-center justify-between flex-wrap gap-2">
                                                <p className="text-base font-semibold text-gray-900">
                                                  {review.user_id?.name ||
                                                    "Người dùng ẩn danh"}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                  <span className="text-xs text-gray-500">
                                                    {new Date(
                                                      review.review_date
                                                    ).toLocaleDateString(
                                                      "vi-VN"
                                                    )}
                                                  </span>
                                                </div>
                                              </div>
                                              <StarRating
                                                rating={review.rating}
                                                interactive={false}
                                                size="w-4 h-4"
                                              />

                                              {/* Phần nội dung bình luận */}
                                              <p className="text-gray-700 text-sm leading-relaxed">
                                                {review.comment}
                                              </p>
                                            </div>
                                          )
                                        )}
                                      {reviews.length > 3 && (
                                        <div className="text-center pt-2">
                                          <span className="text-sm text-purple-600 font-medium">
                                            +{reviews.length - 3} đánh giá khác
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Form viết đánh giá */}
                              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-6 rounded-2xl shadow-sm mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="bg-green-500 p-2 rounded-lg">
                                    <Pencil className="w-5 h-5 text-white" />
                                  </div>
                                  <h3 className="text-xl font-semibold text-gray-800">
                                    Viết đánh giá của bạn
                                  </h3>
                                </div>

                                <div className="space-y-5">
                                  {/* Rating section */}
                                  <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700">
                                      Đánh giá của bạn
                                    </label>
                                    <div className="flex items-center gap-4">
                                      <StarRating
                                        rating={newRating}
                                        onRatingChange={setNewRating}
                                        onHover={setHoverRating}
                                        onLeave={() => setHoverRating(0)}
                                        size="w-7 h-7"
                                      />
                                      <span className="text-sm text-gray-600 font-medium">
                                        {newRating} sao
                                      </span>
                                    </div>
                                  </div>

                                  {/* Comment section */}
                                  <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700">
                                      Chia sẻ trải nghiệm
                                    </label>
                                    <textarea
                                      rows={4}
                                      placeholder="Hãy chia sẻ chi tiết về trải nghiệm của bạn để giúp những người khác..."
                                      value={newReview}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>
                                      ) => setNewReview(e.target.value)}
                                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200 placeholder-gray-400"
                                    />
                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                      <span>{newReview.length}/500 ký tự</span>
                                      <span>Tối thiểu 10 ký tự</span>
                                    </div>
                                  </div>

                                  {/* Submit button */}
                                  <button
                                    onClick={handleSubmit}
                                    disabled={
                                      !newReview.trim() || newReview.length < 10
                                    }
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                                  >
                                    <Send className="w-4 h-4" />
                                    Gửi đánh giá
                                  </button>
                                </div>
                              </div>

                              {/* Danh sách đánh giá đầy đủ (ẩn trên mobile, hiện trên desktop) */}
                              {reviews?.length > 3 && (
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2 mb-4">
                                    <MessageCircle className="w-5 h-5 text-blue-500" />
                                    <h4 className="text-lg font-semibold text-gray-800">
                                      Tất cả đánh giá ({reviews.length})
                                    </h4>
                                  </div>

                                  <div className="grid gap-4">
                                    {reviews
                                      .slice(3)
                                      .map((review: Review, index: number) => (
                                        <div
                                          key={index + 3}
                                          className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-md transition-all duration-200 hover:border-blue-200"
                                        >
                                          <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                              <StarRating
                                                rating={review.rating}
                                                interactive={false}
                                                size="w-4 h-4"
                                              />
                                              <span className="text-sm font-medium text-gray-600">
                                                {review.rating} sao
                                              </span>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                              {new Date(
                                                review.review_date
                                              ).toLocaleDateString("vi-VN")}
                                            </span>
                                          </div>
                                          <p className="text-gray-700 leading-relaxed">
                                            {review.comment}
                                          </p>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </div>
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
