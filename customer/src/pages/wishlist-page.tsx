import { useState, useEffect } from "react";
import { Heart, MapPin, ShoppingCart, Trash2, Star } from "lucide-react";
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
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get("/wishlists");
        setWishlistItems((response as any) || []);
        console.log(response);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách yêu thích:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlists();
  }, []);

  const removeFromWishlist = async (wishlistId: string) => {
    setRemovingId(wishlistId);
    try {
      await apiClient.delete(`/wishlists/${wishlistId}`);
      setWishlistItems((prev) =>
        prev.filter((item) => item._id !== wishlistId)
      );
      window.alert("Bạn đã xóa tour thành công khỏi danh sách yêu thích");
      window.location.reload();
    } catch (err) {
      console.error("Lỗi khi xóa khỏi danh sách yêu thích:", err);
      alert("Không thể xóa khỏi danh sách yêu thích.");
    } finally {
      setRemovingId(null);
    }
  };

  const addToCart = async (tour: Tour) => {
    try {
      const response = await apiClient.post(`/carts/${tour._id}`, {
        num_people: 1,
      });
      window.alert("Bạn đã thêm thành công");
      console.log("Đã thêm vào giỏ:", (response as any).data);
    } catch (error) {
      window.alert("Bạn đã thêm thất bại");
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN").format(price) + "đ";

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Có lỗi xảy ra
          </h3>
          <p className="text-red-600">
            Không thể tải danh sách yêu thích. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }

  let wishlistArray: WishlistItem[] = [];

  if (Array.isArray(wishlistItems)) {
    wishlistArray = wishlistItems;
  } else if (wishlistItems && typeof wishlistItems === "object") {
    // Nếu là object chứa nhiều wishlist
    if ("_id" in wishlistItems && "tour_id" in wishlistItems) {
      // Chỉ là 1 mục wishlist
      wishlistArray = [wishlistItems];
    } else {
      wishlistArray = Object.values(wishlistItems);
    }
  }
  const wishlistLength = wishlistArray.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Danh sách yêu thích
              </h1>
              <p className="text-gray-600 text-sm">
                {wishlistLength} tour đã lưu
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {wishlistLength === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-sm p-12">
              <div className="text-gray-400 text-6xl mb-4">💔</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Chưa có tour yêu thích
              </h3>
              <p className="text-gray-500 mb-6">
                Hãy khám phá và thêm những tour du lịch yêu thích của bạn
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Khám phá tour
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistArray.map(({ _id, tour_id }) => {
              if (!tour_id) return null;
              return (
                <div
                  key={_id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        tour_id.images?.[0]?.url ||
                        "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={tour_id.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

                    <button
                      onClick={() => removeFromWishlist(tour_id._id)}
                      disabled={removingId === _id}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:scale-110 transition-all duration-200 disabled:opacity-50"
                    >
                      {removingId === _id ? (
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 className="w-4 h-4 text-red-500" />
                      )}
                    </button>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tour_id.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-600 text-sm line-clamp-1">
                        {tour_id.location}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(tour_id.price)}
                      </div>
                      <div className="text-sm text-gray-500"></div>
                    </div>

                    <button
                      onClick={() => addToCart(tour_id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
