import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AddTourForm from "./components/AddTourForm";
import TourDetail from "./components/TourDetail";
import ToursPage from "./pages/Tours";
import EmployeesPage from "./pages/Employees";
import CustomersPage from "./pages/Customers";
import ReviewsPage from "./pages/Reviews";
import PaymentsPage from "./pages/Payments";
import RefundPage from "./pages/Refund";

import { isAuthenticated, getUserFromLocalStorage } from "./utils/auth";
import MainLayout from "./components/MainLayout";

// Wrapper component kiểm tra xác thực và phân quyền
function AuthRoute({ roles }) {
  const user = getUserFromLocalStorage();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Access Denied
              </h2>
              <p className="text-gray-600 mb-4">
                You don't have permission to access this page.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Your role:</span>{" "}
                  {user?.role || "Unknown"}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Required roles:</span>{" "}
                  {roles.join(", ")}
                </p>
              </div>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page - không layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* Routes cho admin, manager, staff */}
        <Route element={<AuthRoute roles={["admin", "manager", "staff"]} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/add" element={<AddTourForm />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/refunds" element={<RefundPage />} />
        </Route>

        {/* Chỉ admin */}
        <Route element={<AuthRoute roles={["admin"]} />}>
          <Route path="/staff" element={<EmployeesPage />} />
        </Route>

        {/* Admin + Manager */}
        <Route element={<AuthRoute roles={["admin", "manager"]} />}>
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
        </Route>

        {/* Trang 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
