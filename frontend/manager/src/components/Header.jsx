// function Header() { 
//   return (
//     <header className="bg-white shadow-sm px-6 py-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800">Hệ Thống Quản Lý Tour Du Lịch</h1>
//         <div className="flex items-center gap-6">
//           {/* Search box */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Tìm kiếm..."
//               className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />
//             <svg
//               className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               ></path>
//             </svg>
//           </div>

//           {/* Admin avatar */}
//           <div className="flex items-center space-x-3">
//             <img
//               src="/api/placeholder/32/32"
//               alt="Admin Avatar"
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <span className="text-gray-700 font-medium">Admin</span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
  
// export default Header;

import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-700">Tour Management</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Admin</span>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;