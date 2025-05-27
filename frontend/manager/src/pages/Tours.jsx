import { useEffect, useState } from "react";
import TourList from "../components/TourList";
import CategoryList from "../components/CategoryList";
import BookingList from "../components/BookingList";

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("tours");

  // Fetch tours data from API
  useEffect(() => {
    // Giả lập fetch data từ API
    setTours([
      { id: 1, title: "Đà Lạt 3n2d", destination: "Đà Lạt", price: 1200 },
      { id: 2, title: "Cát Bà 2n1d", destination: "Cát Bà", price: 800 },
    ]);
  }, []);

  // Fetch bookings data from API
  useEffect(() => {
    // Giả lập fetch data từ API
    setBookings([
      {
        id: 1,
        customerName: "Nguyễn Văn A",
        tourName: "Đà Lạt 3n2d",
        date: "15/06/2024",
        participants: 4,
        status: "confirmed",
      },
      {
        id: 2,
        customerName: "Trần Thị B",
        tourName: "Cát Bà 2n1d",
        date: "20/06/2024",
        participants: 2,
        status: "pending",
      },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Quản lý Tours</h2>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("tours")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "tours"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Danh sách Tours
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "categories"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Quản lý Danh mục
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "bookings"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Quản lý Booking
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-50 rounded-lg p-4">
        {activeTab === "categories" && <CategoryList />}
        {activeTab === "tours" && <TourList tours={tours} />}
        {activeTab === "bookings" && <BookingList bookings={bookings} />}
      </div>
    </div>
  );
};

export default ToursPage;
