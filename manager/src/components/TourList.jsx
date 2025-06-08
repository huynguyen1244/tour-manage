import { useState, useEffect } from "react";
import AddTourForm from "./AddTourForm";
import TourDetail from "./TourDetail";
import apiClient from "../services/apiClient";

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/tours");
        setTours(response.data);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Toggle form tạo tour
  const toggleForm = () => {
    if (selectedTour) setSelectedTour(null);
    setShowForm((prev) => !prev);
  };

  // Hiển thị hoặc ẩn chi tiết tour
  const viewTourDetail = (tour) => {
    if (selectedTour && selectedTour._id === tour._id) {
      setSelectedTour(null);
    } else {
      setSelectedTour(tour);
      setShowForm(false);
    }
  };

  const closeTourDetail = () => setSelectedTour(null);

  const deleteTour = async (tourId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tour này?")) return;
    try {
      await apiClient.delete(`/tours/${tourId}`);
      setTours(tours.filter((tour) => tour._id !== tourId));
    } catch (error) {
      console.error("Lỗi khi xóa tour:", error);
      alert("Không thể xóa tour. Vui lòng thử lại.");
    }
  };

  // Tập hợp tất cả các địa điểm
  const allLocations = tours.map((tour) => tour.location).filter(Boolean);
  const uniqueLocations = [...new Set(allLocations)];

  // Lọc tour theo tìm kiếm và địa điểm
  const filteredTours = tours.filter((tour) => {
    const nameMatch = tour.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const locationMatch = tour.location
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || locationMatch;

    const matchesFilter = locationFilter
      ? tour.location === locationFilter
      : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-brp-6">
      <div className="max-w-7xl mx-auto">
        {/* Header với gradient */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <h1 className="text-2xl font-bold text-gray-900 pt-6 pl-6">
            Các tour hiện có
          </h1>

          {/* Search và Filter Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tìm kiếm tour
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nhập tên tour hoặc địa điểm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lọc theo địa điểm
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Tất cả địa điểm</option>
                  {uniqueLocations.map((location, idx) => (
                    <option key={idx} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-600">
                Tìm thấy{" "}
                <span className="font-semibold text-blue-600">
                  {filteredTours.length}
                </span>{" "}
                tour
              </div>
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md ${
                  showForm
                    ? "bg-gray-500 hover:bg-gray-600 text-white"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                }`}
                onClick={toggleForm}
              >
                {showForm ? (
                  <>
                    <svg
                      className="inline w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Đóng Form
                  </>
                ) : (
                  <>
                    <svg
                      className="inline w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Tạo Tour Mới
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Form thêm tour */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Tạo Tour Mới</h2>
            </div>
            <AddTourForm
              editTour={selectedTour}
              onSuccess={(newTour) => {
                // Cập nhật danh sách sau khi tạo/sửa thành công
                setShowForm(false);
                setSelectedTour(null);
                setTours(
                  (prev) =>
                    selectedTour
                      ? prev.map((t) => (t._id === newTour._id ? newTour : t)) // cập nhật
                      : [...prev, newTour] // thêm mới
                );
              }}
            />
          </div>
        )}

        {/* Tours Grid */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Danh sách Tour
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Đang tải...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã Tour
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên Tour
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Địa điểm
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá tiền
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTours.length > 0 ? (
                    filteredTours.map((tour, index) => (
                      <tr
                        key={tour._id}
                        className={`hover:bg-gray-50 transition-colors ${
                          selectedTour?._id === tour._id ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-mono text-gray-500">
                            #{tour._id.slice(-6)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {tour.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {tour.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-green-600">
                            {tour.price?.toLocaleString() || "0"} VND
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all transform hover:scale-105 ${
                                selectedTour?._id === tour._id
                                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                              }`}
                              onClick={() => viewTourDetail(tour)}
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              {selectedTour?._id === tour._id ? "Ẩn" : "Xem"}
                            </button>

                            <button
                              onClick={() => deleteTour(tour._id)}
                              className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all transform hover:scale-105"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <svg
                            className="w-12 h-12 text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <p className="text-lg font-medium text-gray-900 mb-2">
                            Không tìm thấy tour
                          </p>
                          <p className="text-gray-500">
                            Thử thay đổi bộ lọc hoặc tạo tour mới
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Chi tiết tour */}
        {selectedTour && (
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Chi tiết Tour
                </h2>
                <button
                  onClick={closeTourDetail}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <TourDetail id={selectedTour._id} close={closeTourDetail} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourList;
