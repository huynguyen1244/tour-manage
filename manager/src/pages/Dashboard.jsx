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
          apiClient.get("/tours"),
          apiClient.get("/customers"),
          apiClient.get("/bookings"),
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
