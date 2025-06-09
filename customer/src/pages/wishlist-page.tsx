import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { apiClient } from "@/services/axios";

interface Tour {
  _id: string;
  name: string;
  location: string;
  price: number;
  images: { url: string }[];
}

interface WishlistItem {
  _id: string;
  tour_id: Tour;
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await apiClient.get("/wishlists");
        console.log(response);
        setWishlistItems((response as any).data);
      } catch (error) {
        setError(true);
        console.error("Lỗi khi lấy tours:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  const removeFromWishlist = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item._id !== id));
  };

  const addToCart = (tour: Tour) => {
    // Logic thêm vào giỏ hàng
    console.log("Thêm vào giỏ hàng:", tour);
    alert(`Đã thêm "${tour.name}" vào giỏ hàng!`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-6 h-6 text-red-500" />
        <h2 className="text-2xl font-bold">Danh sách yêu thích</h2>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Đang tải...</p>
      ) : error ? (
        <p className="text-center text-red-500">Lỗi khi tải dữ liệu.</p>
      ) : wishlistItems?.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Chưa có tour yêu thích</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={item.tour_id.images?.[0]?.url}
                  alt={item.tour_id.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-50"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{item.tour_id.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {item.tour_id.location}
                </p>
                <p className="text-blue-600 font-bold text-lg mb-3">
                  {formatPrice(item.tour_id.price)}
                </p>
                <button
                  onClick={() => addToCart(item.tour_id)}
                  className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
