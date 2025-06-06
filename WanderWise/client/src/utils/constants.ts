// Colors
export const COLORS = {
  primary: "#1A73E8",
  secondary: "#34A853",
  accent: "#FBBC04",
  background: "#F8F9FA",
  textDark: "#202124",
  textLight: "#5F6368",
};

// Tour categories
export const TOUR_CATEGORIES = [
  "Mạo Hiểm",
  "Biển",
  "Thành Phố",
  "Văn Hóa",
  "Du Lịch Sinh Thái",
  "Gia Đình",
  "Ẩm Thực & Rượu",
  "Leo Núi",
  "Lịch Sử",
  "Sang Trọng",
  "Thiên Nhiên",
  "Thư Giãn",
];

// Popular destinations
export const POPULAR_DESTINATIONS = [
  "Bali",
  "Paris",
  "Tokyo",
  "New York",
  "Santorini",
  "Barcelona",
  "Cairo",
  "Sydney",
];

// Booking statuses
export const BOOKING_STATUSES = {
  CONFIRMED: "confirmed",
  PENDING: "pending",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

// Application routes
export const ROUTES = {
  HOME: "/",
  TOURS: "/tours",
  TOUR_DETAILS: (id: number | string) => `/tours/${id}`,
  AUTH: "/auth",
  PROFILE: "/profile",
  BOOKINGS: "/bookings",
  DESTINATIONS: "/destinations",
  ABOUT: "/about",
  CONTACT: "/contact",
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "Trường này là bắt buộc",
  EMAIL_INVALID: "Vui lòng nhập địa chỉ email hợp lệ",
  PASSWORD_MIN_LENGTH: "Mật khẩu phải có ít nhất 8 ký tự",
  PASSWORDS_DONT_MATCH: "Mật khẩu không khớp",
  USERNAME_MIN_LENGTH: "Tên người dùng phải có ít nhất 3 ký tự",
  PHONE_INVALID: "Vui lòng nhập số điện thoại hợp lệ",
};

// Tour sorting options
export const SORT_OPTIONS = [
  { label: "Nổi Bật", value: "featured" },
  { label: "Giá: Thấp đến Cao", value: "price-low" },
  { label: "Giá: Cao đến Thấp", value: "price-high" },
  { label: "Thời Gian: Ngắn Nhất", value: "duration-short" },
  { label: "Thời Gian: Dài Nhất", value: "duration-long" },
  { label: "Đánh Giá Cao Nhất", value: "rating" },
];

// Number of travelers options
export const TRAVELERS_OPTIONS = [
  { label: "1 Người Lớn", value: "1" },
  { label: "2 Người Lớn", value: "2" },
  { label: "3 Người Lớn", value: "3" },
  { label: "4 Người Lớn", value: "4" },
  { label: "5 Người Lớn", value: "5" },
  { label: "6+ Người Lớn", value: "6" },
];
