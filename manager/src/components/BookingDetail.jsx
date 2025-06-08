import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const BookingDetail = ({ id, close }) => {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await apiClient.get(`/bookings/${id}`);
        setBooking(res.data); // assume axios, not need `.json()`
      } catch (error) {
        console.error("Failed to fetch booking:", error);
      }
    };

    fetchBooking();
  }, [id]);

  const toggleActivity = (activityId) => {
    setBooking((prev) => ({
      ...prev,
      itineraryProgress: prev.itineraryProgress.map((activity) =>
        activity._id === activityId
          ? { ...activity, completed: !activity.completed }
          : activity
      ),
    }));
  };

  if (!booking) return null;

  const { user_id, tour_id, itineraryProgress, payment } = booking;
  const completedCount = itineraryProgress.filter((a) => a.completed).length;
  const completionPercentage = Math.round(
    (completedCount / itineraryProgress.length) * 100
  );

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Chờ xác nhận";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getPaymentStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ thanh toán";
      case "deposited":
        return "Đã cọc";
      case "completed":
        return "Đã thanh toán";
      case "failed":
        return "Thanh toán thất bại";
      default:
        return status;
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "deposited":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Chi tiết Booking</h3>
            <button
              onClick={close}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Thông tin cơ bản */}
          <div className="p-2 gap-4 mb-6">
            {/* <div>
              <span className="font-medium text-gray-700">ID:</span>
              <span className="ml-2">{booking._id}</span>
            </div> */}
            <div>
              <span className="font-medium text-gray-700">Khách hàng:</span>
              <span className="ml-2">{user_id?.name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <span className="ml-2">{user_id?.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Số điện thoại:</span>
              <span className="ml-2">{user_id?.phone}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Tour:</span>
              <span className="ml-2">{tour_id?.name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Ngày bắt đầu:</span>
              <span className="ml-2">
                {new Date(tour_id?.start_date).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Ngày bắt đầu:</span>
              <span className="ml-2">
                {new Date(tour_id?.end_date).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Số người:</span>
              <span className="ml-2">{booking.num_people}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Trạng thái:</span>
              <span
                className={`ml-2 font-medium ${getStatusColor(booking.status)}`}
              >
                {getStatusText(booking.status)}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Thanh toán:</span>
              <span
                className={`ml-2 font-medium ${getPaymentColor(
                  payment?.payment_status
                )}`}
              >
                {getPaymentStatusText(payment?.payment_status)}
              </span>
            </div>
          </div>

          {/* Tiến độ hoạt động */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-gray-800">Tiến độ hoạt động</h4>
              <span className="text-sm text-gray-600">
                {completedCount}/{itineraryProgress.length} (
                {completionPercentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Lịch trình tour */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">
              Lịch trình tour
            </h4>
            <div className="space-y-2">
              {itineraryProgress.map((activity) => (
                <div
                  key={activity._id}
                  className={`flex items-center p-3 rounded-lg border ${
                    activity.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => toggleActivity(activity._id)}
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-colors ${
                      activity.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {activity.completed && (
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">
                      {activity.day}
                    </div>
                    <div
                      className={`text-sm ${
                        activity.completed
                          ? "text-green-800 line-through"
                          : "text-gray-700"
                      }`}
                    >
                      {activity.description}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      activity.completed
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.completed ? "Hoàn thành" : "Chưa thực hiện"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ghi chú */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Ghi chú</h4>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
              rows="3"
              placeholder="Thêm ghi chú về booking này..."
            ></textarea>
          </div>

          {/* Hành động */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Cập nhật lần cuối: {new Date().toLocaleString("vi-VN")}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={close}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Đóng
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Lưu thay đổi
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Hoàn thành Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
