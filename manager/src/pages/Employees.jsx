import { useState, useEffect } from "react";
import {
  UserPlus,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  Users,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import apiClient from "../services/apiClient";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        setLoading(true);
        const response = await apiClient.get("/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
        setError("Không thể tải danh sách nhân viên");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const resetForm = () => {
    setFormData({
      _id: null,
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      is_active: true,
      role: "staff",
    });
    setIsEditing(false);
    setShowForm(false);
    setError("");
    setShowPassword(false);
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
      setError("");

      if (!formData.name.trim()) {
        setError("Tên nhân viên là bắt buộc");
        return;
      }
      if (!formData.email.trim()) {
        setError("Email là bắt buộc");
        return;
      }
      if (!isEditing && !formData.password.trim()) {
        setError("Mật khẩu là bắt buộc khi tạo mới");
        return;
      }

      setLoading(true);

      if (isEditing) {
        const res = await apiClient.put(`/employees/${formData._id}`, formData);
        setEmployees((prev) =>
          prev.map((employee) =>
            employee._id === formData._id ? { ...formData } : employee
          )
        );
        window.alert("Sửa thành công");
      } else {
        const res = await apiClient.post("/employees", formData);
        setEmployees((prev) => [...prev, res.data]);
      }
      resetForm();
    } catch (err) {
      console.error("Lỗi khi lưu nhân viên:", err);
      setError("Đã xảy ra lỗi khi lưu nhân viên. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee) => {
    setFormData({ ...employee, password: "" });
    setIsEditing(true);
    setShowForm(true);
    setError("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
      try {
        await apiClient.delete(`/employees/${id}`);
        setEmployees((prev) => prev.filter((employee) => employee._id !== id));
        if (isEditing && formData._id === id) {
          resetForm();
        }
      } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
        setError("Không thể xóa nhân viên");
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

  const getRoleDisplay = (role) => {
    return role === "staff"
      ? "Nhân viên"
      : role === "manager"
      ? "Quản lý"
      : role;
  };

  const getRoleBadgeColor = (role) => {
    return role === "manager"
      ? "bg-purple-100 text-purple-800 border-purple-200"
      : "bg-blue-100 text-blue-800 border-blue-200";
  };

  if (loading && employees.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded mb-4"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quản lý Nhân viên
              </h1>
              <p className="text-gray-600">
                Quản lý thông tin và quyền hạn của nhân viên
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <UserPlus size={20} className="mr-2" />
              Thêm nhân viên
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Tổng nhân viên
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Đang hoạt động
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter((emp) => emp.is_active).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Quản lý</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter((emp) => emp.role === "manager").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Vô hiệu hóa</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter((emp) => !emp.is_active).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tất cả vai trò</option>
                <option value="staff">Nhân viên</option>
                <option value="manager">Quản lý</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Kích hoạt</option>
                <option value="inactive">Vô hiệu</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Employee Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isEditing ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên nhân viên <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập tên nhân viên"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu{" "}
                      {!isEditing && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={
                          isEditing ? "Để trống nếu không đổi" : "Nhập mật khẩu"
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ
                    </label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập địa chỉ"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vai trò
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="staff">Nhân viên</option>
                      <option value="manager">Quản lý</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      name="is_active"
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-3 text-sm font-medium text-gray-700">
                      Kích hoạt tài khoản
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading
                      ? "Đang lưu..."
                      : isEditing
                      ? "Cập nhật"
                      : "Thêm mới"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employee List */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {filteredEmployees.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterRole || filterStatus
                  ? "Không tìm thấy nhân viên"
                  : "Chưa có nhân viên nào"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterRole || filterStatus
                  ? "Thử thay đổi bộ lọc để xem kết quả khác"
                  : "Bắt đầu bằng cách thêm nhân viên đầu tiên"}
              </p>
              {!searchTerm && !filterRole && !filterStatus && (
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <UserPlus size={20} className="mr-2" />
                  Thêm nhân viên
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nhân viên
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Liên hệ
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vai trò
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee, index) => (
                    <tr
                      key={employee._id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white font-medium text-lg">
                                {employee.name?.charAt(0)?.toUpperCase() || "N"}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {employee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {employee._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center mb-1">
                            <Mail size={14} className="mr-2 text-gray-400" />
                            {employee.email}
                          </div>
                          {employee.phone && (
                            <div className="flex items-center mb-1">
                              <Phone size={14} className="mr-2 text-gray-400" />
                              {employee.phone}
                            </div>
                          )}
                          {employee.address && (
                            <div className="flex items-center">
                              <MapPin
                                size={14}
                                className="mr-2 text-gray-400"
                              />
                              <span className="truncate max-w-32">
                                {employee.address}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(
                            employee.role
                          )}`}
                        >
                          <Shield size={12} className="mr-1" />
                          {getRoleDisplay(employee.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {employee.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            <CheckCircle size={12} className="mr-1" />
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            <XCircle size={12} className="mr-1" />
                            Vô hiệu
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(employee)}
                            className="inline-flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                          >
                            <Edit size={14} className="mr-1" />
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(employee._id)}
                            className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
