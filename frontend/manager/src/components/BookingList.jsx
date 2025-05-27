import { useState } from "react";
import BookingDetail from "./BookingDetail";

const BookingList = ({ bookings }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const viewBookingDetail = (booking) => {
    setSelectedBooking(booking);
  };

  const closeBookingDetail = () => {
    setSelectedBooking(null);
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tourName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Hàm chuyển trạng thái thanh toán sang tiếng Việt và màu
  const renderPaymentStatus = (status) => {
    let label = "";
    let style = "";

    switch (status) {
      case "pending":
        label = "Chờ thanh toán";
        style = "bg-yellow-100 text-yellow-800";
        break;
      case "deposited":
        label = "Đã cọc";
        style = "bg-blue-100 text-blue-800";
        break;
      case "completed":
        label = "Hoàn tất";
        style = "bg-green-100 text-green-800";
        break;
      case "failed":
        label = "Thất bại";
        style = "bg-red-100 text-red-800";
        break;
      default:
        label = "Không rõ";
        style = "bg-gray-100 text-gray-800";
    }

    return (
      <span className={`px-2 py-1 rounded text-sm ${style}`}>{label}</span>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Thanh tìm kiếm và filter */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm theo khách hàng hoặc tour..."
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Bảng danh sách booking */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Khách hàng</th>
            <th className="border border-gray-300 px-4 py-2">Tour</th>
            <th className="border border-gray-300 px-4 py-2">Ngày</th>
            <th className="border border-gray-300 px-4 py-2">Số người</th>
            <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
            <th className="border border-gray-300 px-4 py-2">Thanh toán</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{booking.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {booking.customerName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {booking.tourName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {booking.date}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {booking.participants}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status === "confirmed"
                    ? "Đã xác nhận"
                    : booking.status === "pending"
                    ? "Chờ xác nhận"
                    : "Đã hủy"}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {renderPaymentStatus(booking.paymentStatus)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                  onClick={() => viewBookingDetail(booking)}
                >
                  Xem Chi Tiết
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 mr-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredBookings.length === 0 && (
            <tr>
              <td
                colSpan="8"
                className="text-center text-gray-500 py-4 border border-gray-300"
              >
                Không tìm thấy booking phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedBooking && (
        <BookingDetail booking={selectedBooking} close={closeBookingDetail} />
      )}
    </div>
  );
};

export default BookingList;
