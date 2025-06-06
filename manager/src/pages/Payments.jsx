function PaymentsPage() {
  const payments = [
    {
      id: 1,
      bookingId: 1,
      customer: "Nguyễn Văn A",
      amount: "5,000,000đ",
      status: "Đã thanh toán",
    },
    {
      id: 2,
      bookingId: 2,
      customer: "Trần Thị B",
      amount: "3,000,000đ",
      status: "Chờ thanh toán",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý Thanh toán</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Booking ID</th>
            <th className="px-4 py-2">Khách hàng</th>
            <th className="px-4 py-2">Số tiền</th>
            <th className="px-4 py-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b">
              <td className="px-4 py-2 text-center">{payment.id}</td>
              <td className="px-4 py-2 text-center">{payment.bookingId}</td>
              <td className="px-4 py-2 text-center">{payment.customer}</td>
              <td className="px-4 py-2 text-center">{payment.amount}</td>
              <td className="px-4 py-2 text-center">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsPage;
