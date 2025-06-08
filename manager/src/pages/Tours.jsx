import { useState } from "react";
import TourList from "../components/TourList";
import CategoryList from "../components/CategoryList";
import BookingList from "../components/BookingList";

const ToursPage = () => {
  const [activeTab, setActiveTab] = useState("tours");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Quản lý Tours</h2>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {["tours", "categories", "bookings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab === "tours"
                ? "Danh sách Tours"
                : tab === "categories"
                ? "Quản lý Danh mục"
                : "Quản lý Booking"}
            </button>
          ))}
        </nav>
      </div>

      {/* Nội dung tab */}
      <div className="bg-gray-50 rounded-lg p-4">
        {activeTab === "categories" && <CategoryList />}
        {activeTab === "tours" && <TourList />}
        {activeTab === "bookings" && <BookingList />}
      </div>
    </div>
  );
};

export default ToursPage;
