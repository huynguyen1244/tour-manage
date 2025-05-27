function TourDetail({ tour }) {
  if (!tour) return <div>Không có thông tin tour</div>;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Giả lập dữ liệu chi tiết tour
  const tourDetails = {
    description:
      "Tour du lịch Đà Lạt 3 ngày 2 đêm sẽ đưa bạn đến với thành phố ngàn hoa lãng mạn. Khám phá những địa điểm nổi tiếng như Hồ Xuân Hương, Đồi Robin, Thung lũng Tình yêu và Thiền viện Trúc Lâm. Thưởng thức không khí trong lành và khám phá văn hóa đặc sắc của cao nguyên.",
    includes: [
      "Xe đưa đón",
      "Khách sạn 3 sao",
      "Bữa ăn theo chương trình",
      "Hướng dẫn viên",
      "Vé tham quan",
    ],
    excludes: ["Chi phí cá nhân", "Đồ uống", "Các dịch vụ không đề cập"],
    schedule: [
      {
        day: "Ngày 1: TP.HCM - Đà Lạt",
        activities:
          "Sáng: Khởi hành từ TP.HCM đi Đà Lạt.\nTrưa: Dùng bữa trưa tại nhà hàng.\nChiều: Tham quan Hồ Xuân Hương, Quảng trường Lâm Viên.\nTối: Khám phá chợ đêm Đà Lạt, thưởng thức ẩm thực địa phương.",
      },
      {
        day: "Ngày 2: Khám phá Đà Lạt",
        activities:
          "Sáng: Tham quan Đồi Robin, Thiền viện Trúc Lâm.\nTrưa: Dùng bữa tại nhà hàng.\nChiều: Tham quan Thung lũng Tình yêu, Vườn hoa thành phố.\nTối: Tự do khám phá.",
      },
      {
        day: "Ngày 3: Đà Lạt - TP.HCM",
        activities:
          "Sáng: Tham quan Làng Cù Lần, Thác Datanla.\nTrưa: Dùng bữa trưa.\nChiều: Trở về TP.HCM, kết thúc tour.",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Nguyễn Văn A",
        rating: 5,
        comment: "Tour rất tuyệt vời, hướng dẫn viên nhiệt tình",
        date: "15/03/2025",
      },
      {
        id: 2,
        user: "Trần Thị B",
        rating: 4,
        comment: "Dịch vụ tốt, lịch trình hợp lý nhưng hơi mệt",
        date: "10/03/2025",
      },
      {
        id: 3,
        user: "Lê Văn C",
        rating: 5,
        comment: "Đồ ăn ngon, khách sạn sạch sẽ",
        date: "05/03/2025",
      },
    ],
    bookings: [
      {
        id: 1,
        customer: "Nguyễn Văn Nam",
        phone: "0912345678",
        participants: 2,
        startDate: "15/05/2025",
        status: "confirmed",
      },
      {
        id: 2,
        customer: "Trần Thị Hương",
        phone: "0987654321",
        participants: 4,
        startDate: "20/05/2025",
        status: "confirmed",
      },
      {
        id: 3,
        customer: "Lê Minh Dương",
        phone: "0977123456",
        participants: 1,
        startDate: "25/05/2025",
        status: "pending",
      },
    ],
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">{tour.name}</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Chỉnh sửa
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Xóa
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <img
              src="https://media.istockphoto.com/id/624183176/vi/anh/ru%E1%BB%99ng-b%E1%BA%ADc-thang-%E1%BB%9F-mu-cang-ch%E1%BA%A3i-vi%E1%BB%87t-nam.jpg?s=612x612&w=0&k=20&c=UbNrn36xFBIff9yV3RDl5lPs3-kW-WQ_sSNMB1M3Trs="
              alt={tour.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Mô tả tour</h3>
              <p className="text-gray-600">{tourDetails.description}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Thông tin chi tiết</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Điểm đến:</span>
                <span className="font-medium">{tour.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian:</span>
                <span className="font-medium">{tour.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Giá tour:</span>
                <span className="font-medium text-green-600">
                  {formatPrice(tour.price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Đánh giá:</span>
                <span className="font-medium flex items-center">
                  {tour.rating}
                  <svg
                    className="w-4 h-4 text-yellow-400 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lượt đặt:</span>
                <span className="font-medium">{tour.bookings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trạng thái:</span>
                <span
                  className={`font-medium ${
                    tour.status === "active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tour.status === "active"
                    ? "Đang hoạt động"
                    : "Ngưng hoạt động"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Bao gồm & Không bao gồm</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-600 mb-2">Bao gồm:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {tourDetails.includes.map((item, index) => (
                  <li key={index} className="text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-600 mb-2">Không bao gồm:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {tourDetails.excludes.map((item, index) => (
                  <li key={index} className="text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Lịch trình tour</h3>
          <div className="space-y-4">
            {tourDetails.schedule.map((day, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">{day.day}</h4>
                <p className="text-gray-600 whitespace-pre-line">
                  {day.activities}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Danh sách đặt tour</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liên hệ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số người
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày khởi hành
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tourDetails.bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {booking.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.participants}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.startDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status === "confirmed"
                          ? "Xác nhận"
                          : "Chờ duyệt"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        Xem
                      </button>
                      <button
                        className={`${
                          booking.status === "pending"
                            ? "text-green-600 hover:text-green-900"
                            : "text-gray-400 cursor-not-allowed"
                        } mr-2`}
                      >
                        {booking.status === "pending"
                          ? "Xác nhận"
                          : "Đã xác nhận"}
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Hủy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Đánh giá từ khách hàng</h3>
          <div className="space-y-4">
            {tourDetails.reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="font-medium">{review.user}</div>
                    <div className="ml-2 flex items-center">
                      <span className="text-yellow-400">{review.rating}</span>
                      <svg
                        className="w-4 h-4 text-yellow-400 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;
