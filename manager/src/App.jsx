import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

function AuthRoute({ element, roles }) {
  const user = getUserFromLocalStorage();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    return (
      <div className="text-red-500 text-center mt-10 text-xl">
        403 - You do not have permission to access this page.
      </div>
    );
  }

  return element;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang Login riêng biệt, không có layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* Các route nằm trong layout */}
        <Route
          path="/"
          element={
            <AuthRoute
              element={<MainLayout />}
              roles={["admin", "manager", "staff"]}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="tours" element={<ToursPage />} />
          <Route path="tours/add" element={<AddTourForm />} />
          <Route path="tours/:id" element={<TourDetail />} />
          <Route path="staff" element={<EmployeesPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="refunds" element={<RefundPage />} />
        </Route>

        {/* Trang 404: không dùng layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
