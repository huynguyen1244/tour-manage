import { useState, useEffect } from "react";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Giả lập fetch data từ API
    setCustomers([
      {
        id: 1,
        name: "Nguyễn Văn A",
        email: "a@example.com",
        phone: "0901234567",
        isActive: true,
      },
      {
        id: 2,
        name: "Trần Thị B",
        email: "b@example.com",
        phone: "0907654321",
        isActive: false,
      },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý Khách hàng</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Tên</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Số điện thoại</th>
            <th className="px-4 py-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="px-4 py-2t text-center">{customer.id}</td>
              <td className="px-4 py-2 text-center">{customer.name}</td>
              <td className="px-4 py-2 text-center">{customer.email}</td>
              <td className="px-4 py-2 text-center">{customer.phone}</td>
              <td
                className={`px-4 py-2  text-center ${
                  customer.isActive === true ? "text-green-600" : "text-red-600"
                }`}
              >
                {customer.isActive === true ? "Đã kích hoạt" : "Chưa kích hoạt"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersPage;
