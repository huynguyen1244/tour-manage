import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  Clock,
  Camera,
  Plus,
  X,
} from "lucide-react";

export default function AddTourForm() {
  const [tour, setTour] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    start_location: "",
    destinations: [""],
    price: 0,
    capacity: 1,
    available_slots: 0,
    schedule: "",
    start_date: "",
    end_date: "",
    transport: "",
    includes: [""],
    excludes: [""],
    policies: "",
    itinerary: [{ day: "Ngày 1", description: "" }],
    images: [],
  });
  const [categories, setCategories] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await apiClient.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchTours();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...tour[field]];
    updated[index] = value;
    setTour((prev) => ({ ...prev, [field]: updated }));
  };

  const handleAddToArray = (field, defaultValue) => {
    setTour((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }));
  };

  const handleRemoveFromArray = (field, index) => {
    const updated = [...tour[field]];
    updated.splice(index, 1);
    setTour((prev) => ({ ...prev, [field]: updated }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setTour((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const formData = new FormData();

      // Thêm các trường cơ bản
      formData.append("name", tour.name);
      formData.append("category", tour.category);
      formData.append("description", tour.description);
      formData.append("location", tour.location);
      formData.append("start_location", tour.start_location);
      formData.append("price", tour.price);
      formData.append("capacity", tour.capacity);
      formData.append("available_slots", tour.available_slots);
      formData.append("schedule", tour.schedule);
      formData.append("start_date", tour.start_date);
      formData.append("end_date", tour.end_date);
      formData.append("transport", tour.transport);
      formData.append("policies", tour.policies);

      // Thêm các mảng: destinations, includes, excludes
      tour.destinations.forEach((item) =>
        formData.append("destinations[]", item)
      );
      tour.includes.forEach((item) => formData.append("includes[]", item));
      tour.excludes.forEach((item) => formData.append("excludes[]", item));

      // Thêm mảng object: itinerary
      tour.itinerary.forEach((item, index) => {
        formData.append(`itinerary[${index}][day]`, item.day);
        formData.append(`itinerary[${index}][description]`, item.description);
      });

      // Thêm hình ảnh
      tour.images.forEach((file) => formData.append("images", file));

      const res = await apiClient.post("/tours", formData);
      console.log("Upload thành công:", res.data);
      setSubmitMessage("✅ Tạo tour thành công!");
      // Reset form sau khi thành công
      setTour({
        name: "",
        category: "",
        description: "",
        location: "",
        start_location: "",
        destinations: [""],
        price: 0,
        capacity: 1,
        available_slots: 0,
        schedule: "",
        start_date: "",
        end_date: "",
        transport: "",
        includes: [""],
        excludes: [""],
        policies: "",
        itinerary: [{ day: "Ngày 1", description: "" }],
        images: [],
      });
      window.location.reload();
    } catch (err) {
      console.error("Lỗi upload:", err);
      setSubmitMessage("❌ Có lỗi xảy ra khi tạo tour. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-xl overflow-hidden p-8 space-y-8">
        {/* Submit Message */}
        {submitMessage && (
          <div
            className={`p-4 rounded-lg text-center font-medium ${
              submitMessage.includes("✅")
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {submitMessage}
          </div>
        )}

        {/* Thông tin cơ bản */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <MapPin className="mr-2 text-blue-600" size={24} />
            Thông tin cơ bản
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên tour *
              </label>
              <input
                type="text"
                name="name"
                value={tour.name}
                onChange={handleChange}
                placeholder="VD: Du lịch Hạ Long 3 ngày 2 đêm"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục *
              </label>
              <select
                name="category"
                value={tour.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Điểm đến chính *
              </label>
              <input
                type="text"
                name="location"
                value={tour.location}
                onChange={handleChange}
                placeholder="VD: Vịnh Hạ Long"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Điểm khởi hành *
              </label>
              <input
                type="text"
                name="start_location"
                value={tour.start_location}
                onChange={handleChange}
                placeholder="VD: Hà Nội"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phương tiện
              </label>
              <input
                type="text"
                name="transport"
                value={tour.transport}
                onChange={handleChange}
                placeholder="VD: Xe khách, Tàu thủy"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả ngắn *
            </label>
            <textarea
              name="description"
              value={tour.description}
              onChange={handleChange}
              placeholder="Mô tả ngắn gọn về tour du lịch..."
              rows={4}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Giá và thời gian */}
        <div className="bg-green-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            Giá và thời gian
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá tour (VNĐ) *
              </label>
              <input
                type="number"
                name="price"
                value={tour.price}
                onChange={handleChange}
                placeholder="2500000"
                min="0"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số chỗ *
              </label>
              <div className="relative">
                <Users
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  name="capacity"
                  value={tour.capacity}
                  onChange={handleChange}
                  placeholder="30"
                  min="1"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số slot *
              </label>
              <div className="relative">
                <Ticket
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  name="available_slots"
                  value={tour.available_slots}
                  onChange={handleChange}
                  placeholder="30"
                  min="1"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lịch trình *
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="schedule"
                  value={tour.schedule}
                  onChange={handleChange}
                  placeholder="3 ngày 2 đêm"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày bắt đầu *
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  name="start_date"
                  value={tour.start_date}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày kết thúc *
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  name="end_date"
                  value={tour.end_date}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Điểm đến */}
        <div className="bg-purple-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Điểm đến</h2>
          {tour.destinations.map((dest, index) => (
            <div key={index} className="flex items-center space-x-3 mb-3">
              <input
                value={dest}
                onChange={(e) =>
                  handleArrayChange("destinations", index, e.target.value)
                }
                placeholder={`Điểm đến ${index + 1}`}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              {tour.destinations.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFromArray("destinations", index)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddToArray("destinations", "")}
            className="flex items-center px-4 py-2 text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Thêm điểm đến
          </button>
        </div>

        {/* Bao gồm và Không bao gồm */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-emerald-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Bao gồm
            </h2>
            {tour.includes.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  value={item}
                  onChange={(e) =>
                    handleArrayChange("includes", index, e.target.value)
                  }
                  placeholder={`Dịch vụ ${index + 1}`}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                {tour.includes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFromArray("includes", index)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddToArray("includes", "")}
              className="flex items-center px-4 py-2 text-emerald-600 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Thêm dịch vụ
            </button>
          </div>

          <div className="bg-rose-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Không bao gồm
            </h2>
            {tour.excludes.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  value={item}
                  onChange={(e) =>
                    handleArrayChange("excludes", index, e.target.value)
                  }
                  placeholder={`Chi phí ${index + 1}`}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                />
                {tour.excludes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFromArray("excludes", index)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddToArray("excludes", "")}
              className="flex items-center px-4 py-2 text-rose-600 border border-rose-300 rounded-lg hover:bg-rose-100 transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Thêm chi phí
            </button>
          </div>
        </div>

        {/* Lịch trình chi tiết */}
        <div className="bg-amber-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Lịch trình chi tiết
          </h2>
          {tour.itinerary.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 mb-4 border border-amber-200"
            >
              <div className="flex items-center justify-between mb-3">
                <input
                  value={item.day}
                  onChange={(e) => {
                    const newItinerary = [...tour.itinerary];
                    newItinerary[index].day = e.target.value;
                    setTour((prev) => ({
                      ...prev,
                      itinerary: newItinerary,
                    }));
                  }}
                  className="text-lg font-semibold bg-amber-100 px-3 py-2 rounded-lg border-0 focus:ring-2 focus:ring-amber-500"
                />
                {tour.itinerary.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFromArray("itinerary", index)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <textarea
                value={item.description}
                onChange={(e) => {
                  const newItinerary = [...tour.itinerary];
                  newItinerary[index].description = e.target.value;
                  setTour((prev) => ({ ...prev, itinerary: newItinerary }));
                }}
                placeholder="Mô tả hoạt động trong ngày..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAddToArray("itinerary", {
                day: `Ngày ${tour.itinerary.length + 1}`,
                description: "",
              })
            }
            className="flex items-center px-4 py-2 text-amber-600 border border-amber-300 rounded-lg hover:bg-amber-100 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Thêm ngày
          </button>
        </div>

        {/* Chính sách và Hình ảnh */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chính sách hoàn hủy
            </label>
            <textarea
              name="policies"
              value={tour.policies}
              onChange={handleChange}
              placeholder="Các điều khoản và chính sách hoàn hủy..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Camera className="mr-2 text-gray-600" size={20} />
              Hình ảnh tour
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
          <p className="text-red-500 text-sm mt-4">
            Cần phải điền đầy đủ các thành phần *
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
              isSubmitting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02]"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Đang tạo tour...
              </div>
            ) : (
              "Tạo Tour Du Lịch"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
