import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Dashboard from './pages/Dashboard';
import AddTourForm from './components/AddTourForm';
import TourDetail from './components/TourDetail';
import ToursPage from './pages/Tours';
import CustomersPage from './pages/Customers';
import ReviewsPage from './pages/Reviews';
import PaymentsPage from './pages/Payments';
import RefundPage from './pages/Refund';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/tours" element={<ToursPage />} />
      <Route path="/tours/add" element={<AddTourForm />} />
      <Route path="/tours/:id" element={<TourDetail />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/refunds" element={<RefundPage />} />
      <Route path="*" element={<div className="text-center text-2xl mt-10">404 - Page Not Found</div>} />
    </Routes>
  );
}

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Nếu sau này có LoginPage, RegisterPage riêng thì kiểm tra ở đây.
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return (
      <main className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white shadow rounded">
          <AppRoutes />
        </div>
      </main>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className={`bg-white shadow-md transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
        <Sidebar isOpen={isSidebarOpen} />
      </aside>

      {/* Main layout */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-4">
          <Header toggleSidebar={toggleSidebar} />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AppRoutes />
        </main>

      </div>

    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
