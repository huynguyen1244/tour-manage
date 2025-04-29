import React, { useState } from 'react';
import AddTourForm from './AddTourForm'; // Giả sử bạn đã tạo component AddTourForm
import TourDetail from './TourDetail'; // Import component TourDetail

const TourList = ({ tours }) => {
  // State để hiển thị form thêm tour
  const [showForm, setShowForm] = useState(false);

  // State để hiển thị chi tiết tour
  const [selectedTour, setSelectedTour] = useState(null);

  // Hàm để toggle form
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Hàm để set tour được chọn khi nhấn nút "Xem Chi Tiết"
  const viewTourDetail = (tour) => {
    setSelectedTour(tour); // Lưu thông tin tour vào state
  };

  // Hàm để đóng chi tiết tour
  const closeTourDetail = () => {
    setSelectedTour(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Nút Tạo Tour */}
      <button 
        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
        onClick={toggleForm} // Khi nhấn vào, toggle trạng thái của form
      >
        Tạo Tour
      </button>

      {/* Nếu showForm là true, hiển thị form */}
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
          {tours.map((tour) => (
            <tr key={tour.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{tour.id}</td>
              <td className="border border-gray-300 px-4 py-2">{tour.title}</td>
              <td className="border border-gray-300 px-4 py-2">{tour.destination}</td>
              <td className="border border-gray-300 px-4 py-2">${tour.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button 
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                  onClick={() => viewTourDetail(tour)} // Khi nhấn, hiển thị chi tiết tour
                >
                  Xem Chi Tiết
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 mr-2">
                  Delete
                </button>
                {/* Nút xem chi tiết tour */}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hiển thị chi tiết tour nếu có */}
      {selectedTour && <TourDetail tour={selectedTour} close={closeTourDetail} />}
    </div>
  );
};

export default TourList;
