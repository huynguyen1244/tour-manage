function RefundPage() {
  return (
    <div>
      Tính năng quản lý hoàn tiền hiện tại đang được phát triển. Vui lòng quay
      lại sau để xem cập nhật mới nhất.
      {/* <h1 className="text-2xl font-bold mb-6">Quản lý Hoàn tiền</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Booking ID</th>
            <th className="px-4 py-2">Khách hàng</th>
            <th className="px-4 py-2">Số tiền hoàn</th>
            <th className="px-4 py-2">Lý do</th>
          </tr>
        </thead>
        <tbody>
          {refunds.map((refund) => (
            <tr key={refund.id} className="border-b">
              <td className="px-4 py-2 text-center">{refund.id}</td>
              <td className="px-4 py-2 text-center">{refund.bookingId}</td>
              <td className="px-4 py-2 text-center">{refund.customer}</td>
              <td className="px-4 py-2 text-center">{refund.amount}</td>
              <td className="px-4 py-2 text-center">{refund.reason}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default RefundPage;
