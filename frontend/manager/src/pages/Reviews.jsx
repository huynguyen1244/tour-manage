function ReviewsPage() {
    const reviews = [
      { id: 1, customer: 'Nguyễn Văn A', content: 'Tour rất tuyệt vời!', rating: 5 },
      { id: 2, customer: 'Trần Thị B', content: 'Dịch vụ tốt nhưng cần cải thiện.', rating: 4 },
    ];
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Quản lý Đánh giá</h1>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Khách hàng</th>
              <th className="px-4 py-2">Nội dung</th>
              <th className="px-4 py-2">Đánh giá</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b">
                <td className="px-4 py-2">{review.id}</td>
                <td className="px-4 py-2">{review.customer}</td>
                <td className="px-4 py-2">{review.content}</td>
                <td className="px-4 py-2">{review.rating}⭐</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default ReviewsPage;
  