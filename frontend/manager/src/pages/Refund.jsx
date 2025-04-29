function RefundPage() {
    const refunds = [
      { id: 1, customer: 'Nguyễn Văn A', amount: '2,000,000đ', reason: 'Hủy tour' },
      { id: 2, customer: 'Trần Thị B', amount: '1,500,000đ', reason: 'Không thể tham gia' },
    ];
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Quản lý Hoàn tiền</h1>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Khách hàng</th>
              <th className="px-4 py-2">Số tiền hoàn</th>
              <th className="px-4 py-2">Lý do</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((refund) => (
              <tr key={refund.id} className="border-b">
                <td className="px-4 py-2">{refund.id}</td>
                <td className="px-4 py-2">{refund.customer}</td>
                <td className="px-4 py-2">{refund.amount}</td>
                <td className="px-4 py-2">{refund.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default RefundPage;
  