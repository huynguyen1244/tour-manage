import React from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa"; // Import thêm icon

function Header() {
  return (
    <header className="bg-transparent px-6 py-4 w-full">
      <div className="flex justify-between items-center">
        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide mr-10">
          Hệ Thống Quản Lý Tour Du Lịch
        </h1>

        <div className="flex items-center gap-6">
          {/* Search box */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            />
            <svg
              className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>

          {/* Admin icon and Logout */}
          <div className="flex items-center gap-4">
            {/* Thay avatar bằng icon */}
            <FaUserCircle className="w-10 h-10 text-gray-600" />

            <span className="text-gray-700 font-medium">Admin</span>

            {/* Nút Logout */}
            <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out">
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
