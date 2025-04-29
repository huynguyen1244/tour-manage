import React, { useState, useEffect } from "react";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Giả lập fetch data từ API
    setCustomers([
      { id: 1, name: "Nguyễn Văn A", email: "a@example.com", phone: "0901234567" },
      { id: 2, name: "Trần Thị B", email: "b@example.com", phone: "0907654321" },
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
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="px-4 py-2">{customer.id}</td>
              <td className="px-4 py-2">{customer.name}</td>
              <td className="px-4 py-2">{customer.email}</td>
              <td className="px-4 py-2">{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersPage;
