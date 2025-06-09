import { useEffect, useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  MapPin,
  Users,
  CreditCard,
} from "lucide-react";
import { apiClient } from "@/services/axios";

interface CartItem {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  tour_id: {
    _id: string;
    name: string;
    location: string;
    price: number;
    images: { url: string }[];
  };
  num_people: number;
  total_price: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await apiClient.get("/carts");
        setCartItems(response as any);
      } catch (error) {
        setError(true);
        console.error("Lỗi khi lấy tours:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const updateQuantity = async (id: string, change: number) => {
    const currentItem = cartItems?.find((item) => item._id === id);
    if (!currentItem) return;

    const capacity = (currentItem.tour_id as any).capacity ?? Infinity; // giả định có trường capacity
    const newQuantity = Math.max(
      1,
      Math.min(currentItem.num_people + change, capacity)
    );

    // Nếu không thay đổi gì thì không cần cập nhật
    if (newQuantity === currentItem.num_people) return;

    // Cập nhật state local
    setCartItems((items) =>
      items.map((item) =>
        item._id === id
          ? {
              ...item,
              num_people: newQuantity,
              total_price: item.tour_id.price * newQuantity,
            }
          : item
      )
    );

    // Gọi API
    try {
      await apiClient.put(`/carts/${id}`, { num_people: newQuantity });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await apiClient.delete(`/carts/${id}`);
    } catch (error) {
      console.error("Error removing item:", error);
      return;
    }

    setCartItems((items) => items.filter((item) => item._id !== id));
  };

  const handleCheckout = async (id: string) => {
    try {
      const data = { cart_id: id, payment_method: "banking" };
      await apiClient.post("/bookings", data);
      setCartItems((items) => items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Giỏ hàng của bạn
              </h1>
              <p className="text-gray-600">{cartItems.length} tour đã chọn</p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Giỏ hàng trống
            </h3>
            <p className="text-gray-600 mb-6">
              Hãy thêm một số tour du lịch để bắt đầu!
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Khám phá tours
            </button>
          </div>
        ) : (
          <div className=" gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex gap-4">
                      {/* Tour Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.tour_id.images[0]?.url}
                          alt={item.tour_id.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                      </div>

                      {/* Tour Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                          {item.tour_id.name}
                        </h3>

                        <div className="flex items-center gap-1 text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">
                            {item.tour_id.location}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {item.num_people} người
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 mr-2">
                              Số lượng:
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, -1)}
                              disabled={item.num_people <= 1}
                              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">
                              {item.num_people}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, 1)}
                              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa khỏi giỏ hàng"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="text-lg font-semibold text-blue-600 mt-4">
                          Giá tour: {formatPrice(item.tour_id.price)}
                        </div>
                        <button
                          onClick={() => handleCheckout(item._id)}
                          className="w-full bg-blue-600 text-white py-3 px-10 mt-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <CreditCard className="w-5 h-5" />
                          Thanh toán ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
