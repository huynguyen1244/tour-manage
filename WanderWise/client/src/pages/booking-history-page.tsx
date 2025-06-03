import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
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
import type { Booking, Tour, TourDate } from "@/../../shared/schema";

// Type for booking with tour and tour date information
type BookingWithTour = Booking & {
  tour: Tour;
  tourDate: TourDate;
};

const BookingHistoryPage = () => {
  const { toast } = useToast();
  const [bookingToCancel, setBookingToCancel] = useState<number | null>(null);

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery<BookingWithTour[]>({
    queryKey: ["/api/bookings"],
  });
  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: number) => {
      const res = await apiRequest("POST", `/api/bookings/${bookingId}/cancel`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Đã Hủy Đặt Tour",
        description: "Đặt tour của bạn đã được hủy thành công.",
      });
      setBookingToCancel(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Hủy Thất Bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCancelBooking = (bookingId: number) => {
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
      {" "}
      <Helmet>
        <title>Lịch Sử Đặt Tour | TravelTour</title>
        <meta
          name="description"
          content="Xem và quản lý các đặt tour của bạn với TravelTour."
        />
      </Helmet>{" "}
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
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="py-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-36" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Lỗi Khi Tải Đặt Tour</h2>
            <p className="text-muted-foreground mb-6">
              Chúng tôi không thể tải lịch sử đặt tour của bạn. Vui lòng thử
              lại.
            </p>
            <Button
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["/api/bookings"] })
              }
            >
              Thử Lại
            </Button>
          </div>
        ) : bookings?.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🌍</div>
            <h2 className="text-xl font-bold mb-2">Chưa Có Đặt Tour Nào</h2>
            <p className="text-muted-foreground mb-6">
              Bạn chưa đặt tour nào. Bắt đầu khám phá các tour của chúng tôi để
              bắt đầu cuộc phiêu lưu tiếp theo!
            </p>{" "}
            <Button asChild>
              <Link href="/tours">Tìm Tours</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings?.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex flex-wrap justify-between items-center">
                    <CardTitle className="text-xl">
                      {booking.tour.title}
                    </CardTitle>
                    {getStatusBadge(booking.status)}
                  </div>
                  <CardDescription>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>
                        {booking.tour.destination},{" "}
                        {booking.tour.destinationCountry}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    {" "}
                    <div className="flex flex-col p-3 bg-muted rounded-lg">
                      <div className="flex items-center text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Ngày Đi</span>
                      </div>
                      <div className="font-medium">
                        {format(
                          new Date(booking.tourDate.startDate),
                          "MMM d, yyyy"
                        )}{" "}
                        -{" "}
                        {format(
                          new Date(booking.tourDate.endDate),
                          "MMM d, yyyy"
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col p-3 bg-muted rounded-lg">
                      <div className="flex items-center text-muted-foreground mb-1">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Số Người</span>
                      </div>
                      <div className="font-medium">
                        {booking.numberOfTravelers}{" "}
                        {booking.numberOfTravelers === 1 ? "Người" : "Người"}
                      </div>
                    </div>
                    <div className="flex flex-col p-3 bg-muted rounded-lg">
                      <div className="flex items-center text-muted-foreground mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Thời Gian</span>
                      </div>
                      <div className="font-medium">
                        {booking.tour.duration}{" "}
                        {booking.tour.duration === 1 ? "Ngày" : "Ngày"}
                      </div>
                    </div>
                    <div className="flex flex-col p-3 bg-muted rounded-lg">
                      <div className="flex items-center text-muted-foreground mb-1">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span>Tổng Tiền</span>
                      </div>
                      <div className="font-medium">
                        ${booking.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>{" "}
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/tours/${booking.tourId}`}>Xem Tour</Link>
                  </Button>
                  {booking.status === "confirmed" && (
                    <Button
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={cancelBookingMutation.isPending}
                    >
                      {cancelBookingMutation.isPending &&
                      bookingToCancel === booking.id
                        ? "Đang Hủy..."
                        : "Hủy Đặt Tour"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>{" "}
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
