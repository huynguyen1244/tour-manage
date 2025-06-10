import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/axios";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CreditCard,
  XCircle,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { Link } from "wouter";

const BookingHistoryPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [bookings, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await apiClient.get("/bookings/customer");
        setBooking(response as any);
      } catch (error) {
        setError(true);
        console.error("Lỗi khi lấy bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleShowImage = (
    type: "full" | "deposit",
    id: string,
    amount: number
  ) => {
    let total_amount;
    let message;
    if (type === "full") {
      message = encodeURIComponent(`Thanh toán cho booking có mã ${id}`);
      total_amount = amount;
    } else {
      message = encodeURIComponent(`Đặt cọc cho booking có mã ${id}`);
      total_amount = (amount * 30) / 100;
    }

    const url = `https://img.vietqr.io/image/TPB-06272039601-compact.jpg?amount=${total_amount}&addInfo=${message}`;
    setImageSrc(url);
  };

  const closeModal = () => setImageSrc(null);
  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const res = await apiClient.put(`/bookings/cancel/${bookingId}`);
      return (res as any).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/bookings"] });
      toast({
        title: "Đã Hủy Đặt Tour",
        description: "Đặt tour của bạn đã được hủy thành công.",
      });
      setBookingToCancel(null);
      window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: "Hủy Thất Bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCancelBooking = (bookingId: string) => {
    setBookingToCancel(bookingId);
  };

  const confirmCancelBooking = () => {
    if (bookingToCancel) {
      cancelBookingMutation.mutate(bookingToCancel);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Đã Xác Nhận
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            <XCircle className="h-3 w-3 mr-1" />
            Đã Hủy
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Hoàn Thành
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Đang Chờ
          </Badge>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Lịch Sử Đặt Tour | TravelTour</title>
        <meta
          name="description"
          content="Xem và quản lý các đặt tour của bạn với TravelTour."
        />
      </Helmet>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
            Đặt Tour Của Tôi
          </h1>
          <p className="text-muted-foreground">
            Xem và quản lý các đặt tour của bạn
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6">{/* skeleton code giữ nguyên */}</div>
        ) : error ? (
          <div className="text-center py-10">{/* error code giữ nguyên */}</div>
        ) : bookings?.length === 0 ? (
          <div className="text-center py-16">{/* empty code giữ nguyên */}</div>
        ) : (
          <div className="grid gap-6">
            {bookings?.map((booking: any) => (
              <Card key={booking._id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex flex-wrap justify-between items-center">
                    <CardTitle className="text-xl">
                      {booking.tour_id.name}
                    </CardTitle>
                    {getStatusBadge(booking.status)}
                  </div>
                  <CardDescription>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{booking.tour_id.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="flex flex-col p-3 bg-muted rounded-lg">
                      <div className="flex items-center text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Ngày Đi</span>
                      </div>
                      <div className="font-medium">
                        {format(
                          new Date(booking.tour_id.start_date),
                          "dd/MM/yyyy"
                        )}{" "}
                        -{" "}
                        {format(
                          new Date(booking.tour_id.end_date),
                          "dd/MM/yyyy"
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col p-3 bg-muted rounded-lg">
                      <div className="flex items-center text-muted-foreground mb-1">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Số Người</span>
                      </div>
                      <div className="font-medium">
                        {booking.num_people} Người
                      </div>
                    </div>
                    <div className="flex flex-col p-3 bg-muted rounded-lg">
                      <div className="flex items-center text-muted-foreground mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Thời Gian</span>
                      </div>
                      <div className="font-medium">
                        {booking.tour_id.schedule}
                      </div>
                    </div>
                    <div className="flex flex-col p-3 bg-muted rounded-lg">
                      <div className="flex items-center text-muted-foreground mb-1">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span>Tổng Tiền</span>
                      </div>
                      <div className="font-medium">
                        {booking.total_price.toLocaleString("vi-VN")}₫
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/tours/${booking.tour_id._id}`}>Xem Tour</Link>
                  </Button>

                  {booking.status === "confirmed" && (
                    <Button
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking._id)}
                      disabled={cancelBookingMutation.isPending}
                    >
                      {cancelBookingMutation.isPending &&
                      bookingToCancel === booking._id
                        ? "Đang Hủy..."
                        : "Hủy Đặt Tour"}
                    </Button>
                  )}
                </CardFooter>

                <>
                  <div className="flex gap-3 mb-4 ml-4">
                    <Button
                      variant="outline"
                      className="px-6 py-2 rounded-md border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                      onClick={() =>
                        handleShowImage(
                          "full",
                          booking._id,
                          booking.total_price
                        )
                      }
                    >
                      Thanh toán đầy đủ
                    </Button>
                    <Button
                      variant="outline"
                      className="px-6 py-2 rounded-md border-green-600 text-green-600 hover:bg-green-50 transition"
                      onClick={() =>
                        handleShowImage(
                          "deposit",
                          booking._id,
                          booking.total_price
                        )
                      }
                    >
                      Thanh toán cọc
                    </Button>
                  </div>

                  {/* Modal hiển thị ảnh */}
                  {imageSrc && (
                    <div
                      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
                      onClick={closeModal}
                    >
                      <div
                        className="relative max-w-[90vw] max-h-[90vh] p-4 bg-white rounded-xl shadow-2xl animate-fade-in"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={imageSrc}
                          alt="Hình ảnh thanh toán"
                          className="max-w-full max-h-[75vh] rounded-md object-contain"
                          onError={(e) => {
                            console.error("Không thể tải ảnh:", imageSrc);
                            e.currentTarget.src = "/fallback-image.png"; // fallback nếu cần
                          }}
                        />

                        {/* Nút đóng góc trên bên phải */}
                        <button
                          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition"
                          onClick={closeModal}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog
        open={bookingToCancel !== null}
        onOpenChange={(open) => !open && setBookingToCancel(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hủy Đặt Tour</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn hủy đặt tour này? Hành động này không thể
              hoàn tác. Bạn có thể đủ điều kiện nhận hoàn tiền theo chính sách
              hủy của chúng tôi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Giữ Đặt Tour</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelBooking}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Có, Hủy Đặt Tour
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingHistoryPage;
