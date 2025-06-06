import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 text-center max-w-md w-full">
        <div className="text-red-500 mb-4">
          <FaExclamationTriangle className="text-6xl mx-auto" />
        </div>
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Trang bạn tìm kiếm không tồn tại.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
