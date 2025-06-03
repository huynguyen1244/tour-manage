import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, ShieldCheck } from "lucide-react";
import { TourDate, Tour } from "@shared/schema";
import { format } from "date-fns";
import BookingModal from "./booking-modal";
import { Skeleton } from "@/components/ui/skeleton";

interface TourBookingFormProps {
  tour: Tour;
}

type BookingFormData = {
  tourId: number;
  tourDateId: number;
  numberOfTravelers: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
};

const TourBookingForm = ({ tour }: TourBookingFormProps) => {
  const [selectedDateId, setSelectedDateId] = useState<string>("");
  const [numberOfTravelers, setNumberOfTravelers] = useState<string>("2");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  // Fetch available tour dates
  const {
    data: tourDates,
    isLoading,
    error,
  } = useQuery<TourDate[]>({
    queryKey: [`/api/tours/${tour.id}/dates`],
  });

  // Book tour mutation
  const bookTourMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/bookings", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Đặt tour thành công!",
        description: "Tour của bạn đã được đặt thành công.",
      });
      setIsModalOpen(false);
      setLocation("/bookings");
    },
    onError: (error: Error) => {
      toast({
        title: "Đặt tour thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleBookNow = () => {
    if (!user) {
      toast({
        title: "Yêu cầu xác thực",
        description: "Vui lòng đăng nhập hoặc đăng ký để đặt tour.",
        variant: "destructive",
      });
      setLocation("/auth");
      return;
    }

    if (!selectedDateId) {
      toast({
        title: "Cần chọn ngày",
        description: "Vui lòng chọn ngày tour để tiếp tục.",
        variant: "destructive",
      });
      return;
    }

    const selectedDate = tourDates?.find(
      (date) => date.id === parseInt(selectedDateId)
    );

    if (!selectedDate) return;

    const travelers = parseInt(numberOfTravelers);
    const price = selectedDate.discountedPrice || selectedDate.price;
    const totalPrice = price * travelers;

    setBookingData({
      tourId: tour.id,
      tourDateId: selectedDate.id,
      numberOfTravelers: travelers,
      startDate: format(new Date(selectedDate.startDate), "PPP"),
      endDate: format(new Date(selectedDate.endDate), "PPP"),
      totalPrice,
    });

    setIsModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!bookingData) return;

    const bookingPayload = {
      tourId: bookingData.tourId,
      tourDateId: bookingData.tourDateId,
      numberOfTravelers: bookingData.numberOfTravelers,
      totalPrice: bookingData.totalPrice,
    };

    bookTourMutation.mutate(bookingPayload);
  };

  const discount = tour.discountedPrice
    ? Math.round(((tour.price - tour.discountedPrice) / tour.price) * 100)
    : 0;

  const selectedDate = selectedDateId
    ? tourDates?.find((date) => date.id === parseInt(selectedDateId))
    : null;

  const price = selectedDate
    ? selectedDate.discountedPrice || selectedDate.price
    : tour.discountedPrice || tour.price;

  const travelers = parseInt(numberOfTravelers);
  const subtotal = price * travelers;
  const taxes = subtotal * 0.06; // 6% tax
  const total = subtotal + taxes;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center mb-2">
            <span className="text-xl font-bold text-foreground mr-2">
              ${tour.discountedPrice || tour.price}
            </span>
            {tour.discountedPrice && (
              <>
                <span className="text-xs text-muted-foreground line-through">
                  ${tour.price}
                </span>
                <span className="ml-auto bg-green-100 text-secondary text-xs font-medium px-2 py-1 rounded">
                  Tiết kiệm {discount}%
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Mỗi người</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-1">
            Ngày Tour
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : error ? (
              <div className="text-red-500 text-sm">
                Không thể tải ngày tour
              </div>
            ) : (
              <Select value={selectedDateId} onValueChange={setSelectedDateId}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Chọn ngày" />
                </SelectTrigger>
                <SelectContent>
                  {tourDates?.map((date) => (
                    <SelectItem key={date.id} value={date.id.toString()}>
                      {format(new Date(date.startDate), "MMM d, yyyy")} -{" "}
                      {format(new Date(date.endDate), "MMM d, yyyy")}{" "}
                      {date.availableSpots < 5 && (
                        <span className="text-red-500 ml-1">
                          (Chỉ còn {date.availableSpots} chỗ)
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-1">
            Số Người Du Lịch
          </label>
          <div className="relative">
            <Select
              value={numberOfTravelers}
              onValueChange={setNumberOfTravelers}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn số người" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Người lớn</SelectItem>
                <SelectItem value="2">2 Người lớn</SelectItem>
                <SelectItem value="3">3 Người lớn</SelectItem>
                <SelectItem value="4">4 Người lớn</SelectItem>
                <SelectItem value="5">5 Người lớn</SelectItem>
                <SelectItem value="6">6 Người lớn</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-foreground">Tour Price</span>
            <span className="text-foreground">
              ${price.toFixed(2)} x {travelers}
            </span>
          </div>
          {tour.discountedPrice && (
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-foreground">Discount</span>
              <span className="text-green-600">
                -${((tour.price - tour.discountedPrice) * travelers).toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-foreground">Taxes & Fees</span>
            <span className="text-foreground">${taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-foreground pt-3 border-t border-gray-200 mt-3">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={handleBookNow}
          disabled={bookTourMutation.isPending || !selectedDateId}
        >
          {bookTourMutation.isPending ? "Processing..." : "Book Now"}
        </Button>

        <div className="mt-4 flex justify-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 mr-2 text-secondary" />
            <span>Free cancellation up to 7 days before the tour</span>
          </div>
        </div>
      </div>

      {bookingData && (
        <BookingModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          bookingData={bookingData}
          tour={tour}
          onConfirm={handleConfirmBooking}
          isPending={bookTourMutation.isPending}
        />
      )}
    </>
  );
};

export default TourBookingForm;
