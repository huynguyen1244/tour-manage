// function ToursPage({ onTourClick }) {
//     const [tours, setTours] = useState([
//       { 
//         id: 1, 
//         name: 'Tour Đà Lạt 3N2Đ',
//         price: 2500000,
//         duration: '3 ngày 2 đêm',
//         location: 'Đà Lạt',
//         image: '/api/placeholder/100/60',
//         status: 'active',
//         bookings: 12,
//         rating: 4.5
//       },
//       { 
//         id: 2, 
//         name: 'Tour Phú Quốc 4N3Đ',
//         price: 5800000,
//         duration: '4 ngày 3 đêm',
//         location: 'Phú Quốc',
//         image: '/api/placeholder/100/60',
//         status: 'active',
//         bookings: 8,
//         rating: 4.8
//       },
//       { 
//         id: 3, 
//         name: 'Tour Sapa 2N1Đ',
//         price: 1800000,
//         duration: '2 ngày 1 đêm',
//         location: 'Sapa',
//         image: '/api/placeholder/100/60',
//         status: 'active',
//         bookings: 15,
//         rating: 4.3
//       },
//       { 
//         id: 4, 
//         name: 'Tour Hạ Long 3N2Đ',
//         price: 3200000,
//         duration: '3 ngày 2 đêm',
//         location: 'Hạ Long',
//         image: '/api/placeholder/100/60',
//         status: 'inactive',
//         bookings: 6,
//         rating: 4.6
//       },
//       { 
//         id: 5, 
//         name: 'Tour Nha Trang 5N4Đ',
//         price: 6500000,
//         duration: '5 ngày 4 đêm',
//         location: 'Nha Trang',
//         image: '/api/placeholder/100/60',
//         status: 'active',
//         bookings: 4,
//         rating: 4.7
//       },
//     ]);
  
//     const formatPrice = (price) => {
//       return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
//     };
  
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-semibold text-gray-800">Danh sách tour</h2>
//           <div className="flex space-x-2">
//             <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option value="">Tất cả trạng thái</option>
//               <option value="active">Đang hoạt động</option>
//               <option value="inactive">Ngưng hoạt động</option>
//             </select>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//               Thêm tour mới
//             </button>
//           </div>
//         </div>
  
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt đặt</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đánh giá</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {tours.map((tour) => (
//                   <tr key={tour.id} onClick={() => onTourClick(tour)} className="cursor-pointer hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10">
//                           <img className="h-10 w-16 rounded object-cover" src={tour.image} alt={tour.name} />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{tour.name}</div>
//                           <div className="text-sm text-gray-500">{tour.location}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{tour.duration}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{formatPrice(tour.price)}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {tour.bookings}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <div className="flex items-center">
//                         <span>{tour.rating}</span>
//                         <svg 
//                           className="w-4 h-4 text-yellow-400 ml-1" 
//                           fill="currentColor" 
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
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
//                       <button 
//                         className="text-blue-600 hover:text-blue-900 mr-2"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onTourClick(tour);
//                         }}
//                       >
//                         Xem
//                       </button>
//                       <button 
//                         className="text-green-600 hover:text-green-900 mr-2"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           // Handle edit action
//                         }}
//                       >
//                         Sửa
//                       </button>
//                       <button 
//                         className="text-red-600 hover:text-red-900"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           // Handle delete action
//                         }}
//                       >
//                         Xóa
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//             <div className="flex-1 flex justify-between sm:hidden">
//               <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                 Trước
//               </button>
//               <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                 Sau
//               </button>
//             </div>
//             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm text-gray-700">
//                   Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">12</span> kết quả
//                 </p>
//               </div>
//               <div>
//                 <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                   <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     <span className="sr-only">Trang trước</span>
//                     <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                   <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//                     1
//                   </button>
//                   <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-50">
//                     2
//                   </button>
//                   <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//                     3
//                   </button>
//                   <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     <span className="sr-only">Trang sau</span>
//                     <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default ToursPage;

import React from "react";
import TourList from "../components/TourList";

const ToursPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tours</h2>
      <TourList />
    </div>
  );
};

export default ToursPage;