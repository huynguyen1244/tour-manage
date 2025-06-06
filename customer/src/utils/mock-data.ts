// GHI CHÚ: File này không được sử dụng trong production.
// Ứng dụng sử dụng dữ liệu thực từ API.
// File này chỉ được giữ lại để tham khảo.

import { Tour, TourDate, Booking, Review, User } from "@shared/schema";

export const SAMPLE_TOURS: Tour[] = [
  {
    id: 1,
    title: "Khám Phá Núi Thụy Sĩ: Cuộc Phiêu Lưu Alps",
    description:
      "Trải nghiệm vẻ đẹp ngoạn mục của dãy Alps Thụy Sĩ với trekking có hướng dẫn, đi cáp treo và thưởng thức ẩm thực địa phương đích thực.",
    destination: "Thụy Sĩ",
    destinationCountry: "Thụy Sĩ",
    duration: 5,
    price: 1299,
    discountedPrice: 999,
    capacity: 12,
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    ],
    transportation: "Tàu hỏa và xe buýt riêng",
    accommodation: "Khách sạn núi 3-4 sao",
    includesFood: true,
    itinerary: [
      "Ngày 1: Đến Zurich & Di chuyển đến Interlaken. Bữa tối chào mừng cùng nhóm tour.",
      "Ngày 2: Cáp treo lên đỉnh Schilthorn (2,970m) để ngắm cảnh ngoạn mục. Chiều đi bộ đến làng Mürren.",
      "Ngày 3: Trekking núi Alps và trải nghiệm phô mai Thụy Sĩ truyền thống với bữa trưa fondue.",
      "Ngày 4: Chuyến đi trong ngày đến Lucerne. Khám phá Phố Cổ thời trung cổ và du thuyền trên hồ Lucerne.",
      "Ngày 5: Du thuyền buổi sáng trên hồ Thun. Thăm lâu đài Thun trước khi khởi hành.",
    ],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Thiên Đường Bali: Tour Đảo Nhiệt Đới",
    description:
      "Đắm mình trong những bãi biển tuyệt đẹp, ngôi đền cổ kính và văn hóa sôi động của Bali với tour khám phá toàn diện.",
    destination: "Bali",
    destinationCountry: "Indonesia",
    duration: 7,
    price: 1199,
    discountedPrice: null,
    capacity: 15,
    featured: true,
    rating: 4.6,
    reviewCount: 98,
    image:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    ],
    transportation: "Xe riêng có điều hòa",
    accommodation: "Resort bãi biển 4 sao",
    includesFood: true,
    itinerary: [
      "Ngày 1: Đến Denpasar. Di chuyển đến Ubud với bữa tối chào mừng.",
      "Ngày 2: Khám phá các di tích văn hóa Ubud, bao gồm Rừng Khỉ Thiêng và Cung điện Ubud.",
      "Ngày 3: Thăm ruộng bậc thang Tegalalang và các làng thủ công truyền thống.",
      "Ngày 4: Di chuyển đến khu vực bãi biển Seminyak với buổi chiều thư giãn.",
      "Ngày 5: Chuyến đi trong ngày đến đền Uluwatu và xem biểu diễn múa lửa Kecak truyền thống.",
      "Ngày 6: Cả ngày thư giãn tại bãi biển hoặc các hoạt động thể thao nước tùy chọn.",
      "Ngày 7: Buổi sáng thăm đền Tanah Lot trước khi khởi hành.",
    ],
    isAvailable: true,
    createdAt: new Date(),
  },
];

// Dữ liệu điểm đến mẫu - KHÔNG SỬ DỤNG, dữ liệu thực đến từ API
export const SAMPLE_DESTINATIONS = [
  {
    destination: "Bali",
    country: "Indonesia",
    tourCount: 28,
    image:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    rating: 4.8,
  },
  {
    destination: "Paris",
    country: "Pháp",
    tourCount: 42,
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    rating: 4.7,
  },
  {
    destination: "Santorini",
    country: "Hy Lạp",
    tourCount: 19,
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    rating: 4.9,
  },
  {
    destination: "Tokyo",
    country: "Nhật Bản",
    tourCount: 35,
    image:
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80",
    rating: 4.6,
  },
];

// Dữ liệu ngày tour mẫu - KHÔNG SỬ DỤNG, dữ liệu thực đến từ API
export const SAMPLE_TOUR_DATES: TourDate[] = [
  {
    id: 1,
    tourId: 1,
    startDate: new Date("2023-07-15"),
    endDate: new Date("2023-07-19"),
    availableSpots: 8,
    price: 1299,
    discountedPrice: 999,
  },
  {
    id: 2,
    tourId: 1,
    startDate: new Date("2023-07-22"),
    endDate: new Date("2023-07-26"),
    availableSpots: 12,
    price: 1299,
    discountedPrice: 999,
  },
  {
    id: 3,
    tourId: 1,
    startDate: new Date("2023-08-05"),
    endDate: new Date("2023-08-09"),
    availableSpots: 6,
    price: 1399,
    discountedPrice: 1099,
  },
];

// Dữ liệu đặt tour mẫu - KHÔNG SỬ DỤNG, dữ liệu thực đến từ API
export const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 1,
    userId: 1,
    tourId: 1,
    tourDateId: 1,
    numberOfTravelers: 2,
    totalPrice: 1998,
    status: "confirmed",
    createdAt: new Date("2023-06-10"),
  },
  {
    id: 2,
    userId: 1,
    tourId: 2,
    tourDateId: 3,
    numberOfTravelers: 1,
    totalPrice: 1199,
    status: "cancelled",
    createdAt: new Date("2023-05-22"),
  },
];

// Dữ liệu đánh giá mẫu - KHÔNG SỬ DỤNG, dữ liệu thực đến từ API
export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    userId: 2,
    tourId: 1,
    rating: 5,
    comment:
      "Trải nghiệm tuyệt vời! Cảnh đẹp ngoạn mục và hướng dẫn viên rất am hiểu.",
    createdAt: new Date("2023-04-15"),
  },
  {
    id: 2,
    userId: 3,
    tourId: 1,
    rating: 4,
    comment:
      "Tour tổng thể rất tuyệt. Chỗ ở xuất sắc, mặc dù lịch trình hơi vội vàng.",
    createdAt: new Date("2023-03-22"),
  },
];
