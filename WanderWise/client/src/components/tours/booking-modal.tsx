import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tour } from "@shared/schema";
import {
  CreditCard,
  User as UserIcon,
  Calendar,
  Phone,
  Mail,
  ChevronsUpDown,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingData: {
    tourId: number;
    tourDateId: number;
    numberOfTravelers: number;
    startDate: string;
    endDate: string;
    totalPrice: number;
  };
  tour: Tour;
  onConfirm: () => void;
  isPending: boolean;
}

const BookingModal = ({
  open,
  onOpenChange,
  bookingData,
  tour,
  onConfirm,
  isPending,
}: BookingModalProps) => {
  const { user } = useAuth();
  const [agreeToPolicies, setAgreeToPolicies] = useState(false);

  const subtotal = bookingData.totalPrice / 1.06; // Remove taxes
  const taxes = bookingData.totalPrice - subtotal;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-poppins">
            Hoàn tất đặt chỗ
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <h3 className="text-xl font-bold font-poppins text-foreground mb-2">
            {tour.title}
          </h3>
          <div className="flex items-center text-muted-foreground text-sm mb-3">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {bookingData.startDate} - {bookingData.endDate}
            </span>
            <span className="mx-2">•</span>
            <Users className="h-4 w-4 mr-2" />
            <span>
              {bookingData.numberOfTravelers}{" "}
              {bookingData.numberOfTravelers === 1 ? "Người lớn" : "Người lớn"}
            </span>
          </div>
          <div className="bg-background rounded-lg p-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Giá tour</span>
              <span className="text-foreground">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Thuế & Phí</span>
              <span className="text-foreground">${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-foreground pt-3 border-t border-gray-200 mt-3">
              <span>Tổng cộng</span>
              <span>${bookingData.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold font-poppins text-foreground mb-4">
            Thông tin du khách
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Tên</Label>
              <Input
                id="firstName"
                placeholder="Tên"
                defaultValue={user?.firstName || ""}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Họ</Label>
              <Input
                id="lastName"
                placeholder="Họ"
                defaultValue={user?.lastName || ""}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Địa chỉ email"
                defaultValue={user?.email || ""}
              />
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Số điện thoại"
                defaultValue={user?.phoneNumber || ""}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold font-poppins text-foreground mb-4">
            Thông tin thanh toán
          </h3>
          <div className="mb-4">
            {" "}
            <Label htmlFor="cardNumber">Số thẻ</Label>
            <div className="relative">
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              <div className="absolute right-3 top-2 flex space-x-1">
                <svg
                  className="h-6 w-auto"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45 35C45 37.2 43.2 39 41 39H7C4.8 39 3 37.2 3 35V13C3 10.8 4.8 9 7 9H41C43.2 9 45 10.8 45 13V35Z"
                    fill="#1565C0"
                  />
                  <path
                    d="M15.5 23L20.5 16.5H17L13.5 21.5L10 16.5H6.5L10 23L6 30H9.5L13.5 24.5L17.5 30H21L15.5 23Z"
                    fill="white"
                  />
                  <path d="M18 24.5H36V27H18V24.5Z" fill="white" />
                  <path d="M21 20H33.5V22.5H21V20Z" fill="white" />
                  <path d="M18 16.5H24V19H18V16.5Z" fill="white" />
                </svg>
                <svg
                  className="h-6 w-auto"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                    fill="#FF9800"
                  />
                  <path
                    d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                    fill="#D50000"
                  />
                  <path
                    d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                    fill="#FF3D00"
                  />
                </svg>
                <svg
                  className="h-6 w-auto"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45 35C45 37.2 43.2 39 41 39H7C4.8 39 3 37.2 3 35V13C3 10.8 4.8 9 7 9H41C43.2 9 45 10.8 45 13V35Z"
                    fill="#1565C0"
                  />
                  <path
                    d="M22.255 20L20.142 24.683L18.039 20H15.344V26.726L12.341 20H10.067L7 26.981H8.815L9.516 25.387H13.276L13.977 26.981H17.458V21.594L19.803 26.981H21.445L23.79 21.644V26.981H25.6V20H22.255Z"
                    fill="white"
                  />
                  <path
                    d="M10.699 23.775L11.879 21.094L13.059 23.775H10.699Z"
                    fill="white"
                  />
                  <path
                    d="M37 28C38.1 28 39 27.1 39 26V22C39 20.9 38.1 20 37 20H28C26.9 20 26 20.9 26 22V26C26 27.1 26.9 28 28 28H37Z"
                    fill="#FFC107"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="expiryDate">Ngày hết hạn</Label>
              <Input id="expiryDate" placeholder="MM/YY" />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>
          <div>
            <Label htmlFor="nameOnCard">Tên trên thẻ</Label>
            <Input id="nameOnCard" placeholder="Tên như xuất hiện trên thẻ" />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToPolicies}
              onCheckedChange={(checked) =>
                setAgreeToPolicies(checked as boolean)
              }
            />
            <Label htmlFor="terms" className="text-sm text-muted-foreground">
              Tôi đồng ý với{" "}
              <a href="#" className="text-primary hover:underline">
                Điều khoản và Điều kiện
              </a>{" "}
              và{" "}
              <a href="#" className="text-primary hover:underline">
                Chính sách bảo mật
              </a>
            </Label>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Hủy
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1"
            disabled={!agreeToPolicies || isPending}
          >
            {isPending ? "Đang xử lý..." : "Xác nhận đặt chỗ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
