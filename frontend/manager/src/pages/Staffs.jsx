import { useState, useEffect } from "react";

const StaffsPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    role: "staff",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Giả lập fetch data từ API
    setStaffs([
      {
        id: 1,
        name: "Nguyễn Văn A",
        email: "a@example.com",
        phone: "0901234567",
        role: "staff",
      },
      {
        id: 2,
        name: "Trần Thị B",
        email: "b@example.com",
        phone: "0907654321",
        role: "manager",
      },
    ]);
  }, []);

  const resetForm = () => {
    setFormData({ id: null, name: "", email: "", phone: "", role: "staff" });
    setIsEditing(false);
    setError("");
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
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
      setStaffs((prev) =>
        prev.map((staff) =>
          staff.id === formData.id ? { ...formData } : staff
        )
      );
    } else {
      const newId = staffs.length
        ? Math.max(...staffs.map((s) => s.id)) + 1
        : 1;
      setStaffs((prev) => [...prev, { ...formData, id: newId }]);
    }
    resetForm();
  };

  const handleEdit = (staff) => {
    setFormData(staff);
    setIsEditing(true);
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
      setStaffs((prev) => prev.filter((staff) => staff.id !== id));
      if (isEditing && formData.id === id) {
        resetForm();
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Quản lý Nhân viên</h1>

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
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
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
            <th className="border px-4 py-2">Vai trò</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {staffs.length ? (
            staffs.map((staff) => (
              <tr key={staff.id} className="border-b text-center">
                <td className="border px-4 py-2">{staff.id}</td>
                <td className="border px-4 py-2">{staff.name}</td>
                <td className="border px-4 py-2">{staff.email}</td>
                <td className="border px-4 py-2">{staff.phone}</td>
                <td className="border px-4 py-2 capitalize">{staff.role}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(staff)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500 italic">
                Chưa có nhân viên nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffsPage;
