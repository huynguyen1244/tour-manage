import { useState } from "react";
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

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/bookings/customer"],
    queryFn: async () => {
      const res = await apiClient.get("/bookings/customer");
      return (res as any).data;
    },
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const res = await apiClient.post(`/bookings/${bookingId}`, "");
      return (res as any).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/bookings"] });
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
            {bookings.map((booking: any) => (
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
                        {booking.number_of_travelers} Người
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
