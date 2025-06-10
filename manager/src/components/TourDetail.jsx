import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import TourDetailImage from "./TourDetailImage";
import { Camera } from "lucide-react";
function TourDetail({ id }) {
  const [tour, setTour] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [newImage, setNewImage] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchTour = async () => {
      try {
        console.log("Fetching tour with ID:", id);

        const response = await apiClient.get(`/tours/${id}`);
        console.log("API Response:", response);

        // Kiểm tra cấu trúc response
        const tourData = response.data?.data || response.data;
        console.log("Tour data:", tourData);

        if (tourData) {
          setTour(tourData);
          setEditForm(tourData);
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch tour data"
        );
      }
    };

    fetchTour();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm(tour); // Reset form data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddArrayItem = (field) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ""],
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    setEditForm((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddItinerary = () => {
    setEditForm((prev) => ({
      ...prev,
      itinerary: [...(prev.itinerary || []), { day: "", description: "" }],
    }));
  };

  const handleRemoveItinerary = (index) => {
    setEditForm((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImage(files);
    console.log(files);
    setTour((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Chuẩn bị dữ liệu để gửi (loại bỏ các field không cần thiết)
      const updateData = {
        name: editForm.name,
        description: editForm.description,
        location: editForm.location,
        start_location: editForm.start_location,
        destinations: editForm.destinations,
        capacity: editForm.capacity,
        price: Number(editForm.price),
        available_slots: Number(editForm.available_slots),
        schedule: editForm.schedule,
        start_date: editForm.start_date,
        end_date: editForm.end_date,
        transport: editForm.transport,
        includes: editForm.includes,
        excludes: editForm.excludes,
        policies: editForm.policies,
        itinerary: editForm.itinerary,
        status: editForm.status,
      };

      console.log("Updating tour with data:", updateData);

      const response = await apiClient.put(`/tours/${id}`, updateData);
      console.log("Update response:", response);
      const formData = new FormData();

      if (newImage && newImage.length > 0) {
        const formData = new FormData();

        newImage.forEach((file) => {
          formData.append("images", file); // key "images" backend nhận dạng
        });

        try {
          const response = await apiClient.put(`/tours/${id}`, formData, {
            // Không cần set Content-Type thủ công, axios tự xử lý
            headers: {
              // 'Content-Type': 'multipart/form-data', // để axios tự thêm
            },
          });

          console.log("Upload images response:", response.data);
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      }

      // Cập nhật tour data
      const updatedTour = response.data?.data || response.data;
      setTour(updatedTour);
      setEditForm(updatedTour);
      setIsEditing(false);
      setNewImage(null);

      alert("Cập nhật tour thành công!");
    } catch (error) {
      console.error("Error updating tour:", error);
      alert(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật tour");
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  if (!tour)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600 text-center">
          <p className="text-lg font-medium">Không tìm thấy thông tin tour</p>
          <p className="mt-2">Tour ID: {id}</p>
        </div>
      </div>
    );

  return (
    <div className="space-y-6 pt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isEditing ? "Chỉnh sửa tour" : tour.name}
        </h2>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Đang lưu..." : "Lưu"}
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Hủy
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Chỉnh sửa
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        {isEditing ? (
          <div className="space-y-6">
            {/* Form chỉnh sửa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên tour
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa điểm
                </label>
                <input
                  type="text"
                  name="location"
                  value={editForm.location || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Điểm khởi hành
                </label>
                <input
                  type="text"
                  name="start_location"
                  value={editForm.start_location || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lịch trình
                </label>
                <input
                  type="text"
                  name="schedule"
                  value={editForm.schedule || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số người
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={editForm.capacity || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá tour (VND)
                </label>
                <input
                  type="number"
                  name="price"
                  value={editForm.price || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số chỗ còn lại
                </label>
                <input
                  type="number"
                  name="available_slots"
                  value={editForm.available_slots || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formatDate(editForm.start_date)}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formatDate(editForm.end_date)}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phương tiện
                </label>
                <input
                  type="text"
                  name="transport"
                  value={editForm.transport || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={editForm.status || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="available">Có sẵn</option>
                  <option value="unavailable">Ngưng hoạt động</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả
              </label>
              <textarea
                name="description"
                value={editForm.description || ""}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chính sách
              </label>
              <textarea
                name="policies"
                value={editForm.policies || ""}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Destinations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Điểm tham quan
              </label>
              {editForm.destinations?.map((destination, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) =>
                      handleArrayChange("destinations", index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem("destinations", index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem("destinations")}
                className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Thêm điểm tham quan
              </button>
            </div>

            {/* Includes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bao gồm
              </label>
              {editForm.includes?.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleArrayChange("includes", index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem("includes", index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem("includes")}
                className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Thêm mục bao gồm
              </button>
            </div>

            {/* Excludes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Không bao gồm
              </label>
              {editForm.excludes?.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleArrayChange("excludes", index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem("excludes", index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem("excludes")}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Thêm mục không bao gồm
              </button>
            </div>

            {/* Itinerary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lịch trình chi tiết
              </label>
              {editForm.itinerary?.map((day, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-md p-4 mb-4"
                >
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={day.day}
                      onChange={(e) =>
                        handleItineraryChange(index, "day", e.target.value)
                      }
                      placeholder="Ngày"
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItinerary(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Xóa ngày
                    </button>
                  </div>
                  <textarea
                    value={day.description}
                    onChange={(e) =>
                      handleItineraryChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Mô tả hoạt động trong ngày"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddItinerary}
                className="px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Thêm ngày
              </button>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Camera className="mr-2 text-gray-600" size={20} />
                Thêm ảnh cho tour
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Camera className="mx-auto mb-4 text-gray-400" size={48} />
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="images"
                  accept="image/*"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <span className="text-blue-600 font-medium hover:text-blue-500">
                    Chọn hình ảnh
                  </span>
                  <span className="text-gray-500"> hoặc kéo thả vào đây</span>
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  PNG, JPG, GIF up to 10MB
                </p>
                {tour.images.length > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    Đã chọn {tour.images.length} hình ảnh
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* View mode - existing display code */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex gap-4">
                  <TourDetailImage images={tour.images} />
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Mô tả tour</h3>
                  <p className="text-gray-600">{tour.description}</p>
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
                    <span className="text-gray-600">Điểm khởi hành:</span>
                    <span className="font-medium">{tour.start_location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian:</span>
                    <span className="font-medium">{tour.schedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày bắt đầu:</span>
                    <span className="font-medium">
                      {formatDisplayDate(tour.start_date)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày kết thúc:</span>
                    <span className="font-medium">
                      {formatDisplayDate(tour.end_date)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số người:</span>
                    <span className="font-medium">{tour.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phương tiện:</span>
                    <span className="font-medium">{tour.transport}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Còn lại:</span>
                    <span className="font-medium">
                      {tour.available_slots} chỗ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá tour:</span>
                    <span className="font-medium text-green-600">
                      {formatPrice(tour.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trạng thái:</span>
                    <span
                      className={`font-medium ${
                        tour.status === "available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tour.status === "available"
                        ? "Có sẵn"
                        : "Ngưng hoạt động"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Destinations Section */}
            {tour.destinations && tour.destinations.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Điểm tham quan</h3>
                <div className="flex flex-wrap gap-2">
                  {tour.destinations.map((destination, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {destination}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">
                Bao gồm & Không bao gồm
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">Bao gồm:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {tour.includes?.map((item, index) => (
                      <li key={index} className="text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-2">
                    Không bao gồm:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {tour.excludes?.map((item, index) => (
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
                {tour.itinerary?.map((day, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">{day.day}</h4>
                    <p className="text-gray-600">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies Section */}
            {tour.policies && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">
                  Chính sách hủy tour
                </h3>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-700">{tour.policies}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TourDetail;
