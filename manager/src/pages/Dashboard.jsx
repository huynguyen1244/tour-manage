import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const Dashboard = () => {
  const [tours, setTours] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [tourRes, customerRes, bookingRes] = await Promise.all([
          apiClient.get("/tours").catch((e) => {
            console.error("Tours failed:", e);
            throw new Error("Lỗi khi tải tours");
          }),
          apiClient.get("/customers").catch((e) => {
            console.error("Customers failed:", e);
            throw new Error("Lỗi khi tải khách hàng");
          }),
          apiClient.get("/bookings").catch((e) => {
            console.error("Bookings failed:", e);
            throw new Error("Lỗi khi tải bookings");
          }),
        ]);

        setTours(tourRes.data);
        setCustomers(customerRes.data);
        setBookings(bookingRes.data);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => {
    if (b.payment?.payment_status === "completed") {
      return sum + (b.payment.amount || 0);
    }
    return sum;
  }, 0);
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.084 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Bạn không có quyền xem dữ liệu này
          </h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-medium">Tổng số Tour</h3>
            <p className="text-2xl font-bold text-blue-600">{tours.length}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-medium">Tổng số Khách hàng</h3>
            <p className="text-2xl font-bold text-green-600">
              {customers.length}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-medium">Tổng doanh thu</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {totalRevenue} VNĐ
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
