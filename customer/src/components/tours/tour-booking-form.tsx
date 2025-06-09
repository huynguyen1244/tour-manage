import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import BookingModal from "./booking-modal";

const TourBookingForm = ({ cartItem }: { cartItem: any }) => {
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [bookingData, setBookingData] = useState({
    tourId: cartItem.tourId,
    tourDateId: cartItem.tourDateId,
    numberOfTravelers: cartItem.numberOfTravelers,
    totalPrice: cartItem.totalPrice,
  });

  const bookTourMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiClient.post("/api/bookings", data);
      return (res as any).data;
    },
    onSuccess: () => {
      toast({
        title: "Đặt tour thành công!",
        description: "Tour của bạn đã được đặt.",
      });
      setLocation("/bookings");
    },
    onError: (error: any) => {
      toast({
        title: "Đặt tour thất bại",
        description: error.message || "Đã xảy ra lỗi.",
        variant: "destructive",
      });
    },
  });

  const handleConfirmBooking = () => {
    bookTourMutation.mutate(bookingData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-4">
        <p className="text-lg font-semibold">Xác nhận đặt tour</p>
        <div className="text-sm text-muted-foreground mt-2">
          Số người: {bookingData.numberOfTravelers}
          <br />
          Tổng tiền: ${bookingData.totalPrice.toFixed(2)}
        </div>
      </div>

      <Button
        className="w-full"
        onClick={() => setIsModalOpen(true)}
        disabled={bookTourMutation.isPending}
      >
        {bookTourMutation.isPending ? "Đang xử lý..." : "Đặt tour"}
      </Button>

      <BookingModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        bookingData={{
          ...bookingData,
          startDate: "", // optional: điền từ cartItem nếu có
          endDate: "",
        }}
        tour={cartItem.tour}
        onConfirm={handleConfirmBooking}
        isPending={bookTourMutation.isPending}
      />
    </div>
  );
};

export default TourBookingForm;
