// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Tours from "./pages/Tours";
// import TourDetail from "./pages/TourDetail";
// import Login from "./pages/Login";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// export default function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <main className="flex-grow pt-16">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/tours" element={<Tours />} />
//             <Route path="/tour/:id" element={<TourDetail />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ToursPage from "./pages/ToursPage";
import CustomersPage from "./pages/CustomersPage";
import ReviewsPage from "./pages/ReviewsPage";
import PaymentsPage from "./pages/PaymentsPage";
import RefundPage from "./pages/RefundPage";

const App = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "tours":
        return <ToursPage />;
      case "customers":
        return <CustomersPage />;
      case "reviews":
        return <ReviewsPage />;
      case "payments":
        return <PaymentsPage />;
      case "refunds":
        return <RefundPage />;
      default:
        return <div className="text-center text-2xl mt-10">Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">{renderView()}</main>
      </div>
    </div>
  );
};

export default App;