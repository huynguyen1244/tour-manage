import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

// Bạn có thể truyền cartId từ props hoặc lấy từ API nếu cần
const CartCheckoutForm = ({ cartId }: { cartId: string }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const checkoutCartMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiClient.post("/bookings", data);
      return (res as any).data;
    },
    onSuccess: () => {
      toast({
        title: "Thanh toán thành công!",
        description: "Đơn hàng của bạn đã được tạo.",
      });
      setLocation("/bookings");
    },
    onError: (error: any) => {
      toast({
        title: "Thanh toán thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Cần đăng nhập",
        description: "Vui lòng đăng nhập để thanh toán.",
        variant: "destructive",
      });
      setLocation("/auth");
      return;
    }

    if (!cartId) {
      toast({
        title: "Không tìm thấy giỏ hàng",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
      return;
    }

    checkoutCartMutation.mutate({
      cart_id: cartId,
      payment_method: "vnpay",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">
          Kiểm tra và thanh toán đơn hàng từ giỏ hàng.
        </p>
      </div>

      <Button
        className="w-full"
        onClick={handleCheckout}
        disabled={checkoutCartMutation.isPending}
      >
        {checkoutCartMutation.isPending
          ? "Đang xử lý..."
          : "Thanh toán với VNPAY"}
      </Button>

      <div className="mt-4 flex justify-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 mr-2 text-secondary" />
          <span>Hủy miễn phí trước ngày khởi hành 7 ngày</span>
        </div>
      </div>
    </div>
  );
};

export default CartCheckoutForm;
