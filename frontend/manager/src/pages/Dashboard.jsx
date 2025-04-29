// function Dashboard() {
//     const stats = [
//       { label: 'Tổng số tour', value: '24', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'bg-blue-500' },
//       { label: 'Tour đang hoạt động', value: '12', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-green-500' },
//       { label: 'Đặt tour tháng này', value: '85', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'bg-purple-500' },
//       { label: 'Doanh thu (triệu VNĐ)', value: '432', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-yellow-500' },
//     ];
  
//     const recentTours = [
//       { id: 1, name: 'Tour Đà Lạt 3N2Đ', price: '2,500,000 VNĐ', bookings: 12, status: 'active' },
//       { id: 2, name: 'Tour Phú Quốc 4N3Đ', price: '5,800,000 VNĐ', bookings: 8, status: 'active' },
//       { id: 3, name: 'Tour Sapa 2N1Đ', price: '1,800,000 VNĐ', bookings: 15, status: 'active' },
//       { id: 4, name: 'Tour Hạ Long 3N2Đ', price: '3,200,000 VNĐ', bookings: 6, status: 'inactive' },
//       { id: 5, name: 'Tour Nha Trang 5N4Đ', price: '6,500,000 VNĐ', bookings: 4, status: 'active' },
//     ];
  
//     return (
//       <div className="space-y-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Tổng quan</h2>
        
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//               <div className="p-4 flex items-center">
//                 <div className={`rounded-full p-3 ${stat.color}`}>
//                   <svg
//                     className="w-6 h-6 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d={stat.icon}
//                     ></path>
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <h3 className="text-gray-500 text-sm">{stat.label}</h3>
//                   <p className="text-2xl font-bold">{stat.value}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
  
//         {/* Recent Tours Table */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-4 border-b">
//             <h3 className="text-lg font-semibold">Tour gần đây</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên tour</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt đặt</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {recentTours.map((tour) => (
//                   <tr key={tour.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{tour.name}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{tour.price}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{tour.bookings}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           tour.status === 'active'
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-red-100 text-red-800'
//                         }`}
//                       >
//                         {tour.status === 'active' ? 'Đang hoạt động' : 'Ngưng hoạt động'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button className="text-blue-600 hover:text-blue-900 mr-2">Xem</button>
//                       <button className="text-green-600 hover:text-green-900 mr-2">Sửa</button>
//                       <button className="text-red-600 hover:text-red-900">Xóa</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default Dashboard;

import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium">Total Tours</h3>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium">Total Customers</h3>
          <p className="text-2xl font-bold text-green-600">450</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium">Total Revenue</h3>
          <p className="text-2xl font-bold text-yellow-600">$25,000</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;