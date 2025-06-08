import { useState, useEffect } from "react";
import { UserPlus, Edit, Trash2, Search, Filter, X } from "lucide-react";
import apiClient from "../services/apiClient";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    is_active: true,
    role: "staff",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  // Lấy dữ liệu nhân viên từ API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiClient.get("/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
      }
    };
    fetchEmployees();
  }, []);

  const resetForm = () => {
    setFormData({
      _id: null,
      name: "",
      email: "",
      phone: "",
      address: "",
      is_active: true,
      role: "staff",
    });
    setIsEditing(false);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!formData.name.trim()) {
        setError("Tên nhân viên là bắt buộc");
        return;
      }
      if (!formData.email.trim()) {
        setError("Email là bắt buộc");
        return;
      }

      if (isEditing) {
        const res = await apiClient.put(`/employees/${formData._id}`, formData);
        setEmployees((prev) =>
          prev.map((employee) =>
            employee._id === formData._id ? { ...formData } : employee
          )
        );
      } else {
        // Giả sử tạo mới không qua API, tạo _id tạm
        const res = await apiClient.post("/employees", formData);
        setEmployees((prev) => [...prev, { ...formData, res }]);
      }
      resetForm();
    } catch (err) {
      console.error("Lỗi khi lưu nhân viên:", err);
      setError("Đã xảy ra lỗi khi lưu nhân viên. Vui lòng thử lại.");
    }
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
      apiClient.delete(`/employees/${id}`).then(() => {
        console.log("Xóa nhân viên thành công");
      });
      if (isEditing && formData._id === id) {
        resetForm();
      }
    }
  };

  // Filter employees based on search term and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || employee.role === filterRole;
    const matchesStatus =
      filterStatus === "" ||
      (filterStatus === "active" && employee.is_active) ||
      (filterStatus === "inactive" && !employee.is_active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Quản lý Nhân viên</h1>
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả vai trò</option>
              <option value="staff">Nhân viên</option>
              <option value="manager">Quản lý</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Kích hoạt</option>
              <option value="inactive">Vô hiệu</option>
            </select>
          </div>
        </div>
      </div>
      {/* Form tạo / sửa */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 border p-4 rounded shadow bg-white"
        noValidate
      >
        <h2 className="text-xl mb-4">
          {isEditing ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
        </h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="name">
            Tên nhân viên <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Nhập tên nhân viên"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Nhập email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="email">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="phone">
            Số điện thoại
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Nhập số điện thoại"
            type="tel"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="address">
            Địa chỉ
          </label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Nhập địa chỉ"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            id="is_active"
            name="is_active"
            type="checkbox"
            checked={formData.is_active}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="is_active" className="font-medium">
            Kích hoạt
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="role">
            Vai trò
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            {/* <option value="admin">Admin</option> */}
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            {isEditing ? "Cập nhật" : "Thêm mới"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      {/* Bảng danh sách nhân viên */}
      <table className="min-w-full table-auto border border-gray-300 bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Tên</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Số điện thoại</th>
            <th className="border px-4 py-2">Địa chỉ</th>
            <th className="border px-4 py-2">Vai trò</th>
            <th className="border px-4 py-2">Trạng thái</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employees.length ? (
            employees.map((employee) => (
              <tr key={employee._id} className="border-b text-center">
                <td className="border px-4 py-2">{employee._id}</td>
                <td className="border px-4 py-2">{employee.name}</td>
                <td className="border px-4 py-2">{employee.email}</td>
                <td className="border px-4 py-2">{employee.phone}</td>
                <td className="border px-4 py-2">{employee.address}</td>
                <td className="border px-4 py-2 capitalize">{employee.role}</td>
                <td className="border px-4 py-2">
                  {employee.is_active ? (
                    <span className="text-green-600 font-semibold">
                      Kích hoạt
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">Vô hiệu</span>
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500 italic">
                Chưa có nhân viên nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesPage;
