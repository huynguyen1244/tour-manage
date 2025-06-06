import { useState } from "react";
import AddTourForm from "./AddTourForm";
import TourDetail from "./TourDetail";

const TourList = ({ tours }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");

  // Toggle hiển thị form tạo tour
  const toggleForm = () => {
    if (selectedTour) {
      setSelectedTour(null); // Đóng form chi tiết nếu đang mở
    }
    setShowForm((prev) => !prev);
  };

  // Hiển thị hoặc ẩn chi tiết tour
  const viewTourDetail = (tour) => {
    if (selectedTour && selectedTour.id === tour.id) {
      // Nhấn lần 2 để đóng
      setSelectedTour(null);
    } else {
      setSelectedTour(tour);
      setShowForm(false); // Đóng form tạo tour nếu đang mở
    }
  };

  const closeTourDetail = () => setSelectedTour(null);

  const uniqueDestinations = [
    ...new Set(tours.map((tour) => tour.destination)),
  ];

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = destinationFilter
      ? tour.destination === destinationFilter
      : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Tìm tour theo tên hoặc điểm đến..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 rounded w-full md:w-1/3"
        />

        <select
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          className="border px-3 py-1 rounded w-full md:w-1/4"
        >
          <option value="">Tất cả điểm đến</option>
          {uniqueDestinations.map((dest, idx) => (
            <option key={idx} value={dest}>
              {dest}
            </option>
          ))}
        </select>

        <button
          className={`px-4 py-1 rounded w-full md:w-auto text-white transition-colors ${
            showForm
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={toggleForm}
        >
          {showForm ? "Đóng Form" : "Tạo Tour"}
        </button>
      </div>

      {/* Form thêm tour */}
      {showForm && <AddTourForm />}

      {/* Bảng danh sách tour */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Destination</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{tour.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {tour.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {tour.destination}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${tour.price}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    className={`px-3 py-1 rounded-md text-white ${
                      selectedTour?.id === tour.id
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => viewTourDetail(tour)}
                  >
                    {selectedTour?.id === tour.id
                      ? "Đóng Chi Tiết"
                      : "Xem Chi Tiết"}
                  </button>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-4 text-gray-500 italic border border-gray-300"
              >
                Không tìm thấy tour phù hợp
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Chi tiết tour */}
      {selectedTour && (
        <TourDetail tour={selectedTour} close={closeTourDetail} />
      )}
    </div>
  );
};

export default TourList;
