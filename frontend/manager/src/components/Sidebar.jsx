// import React from "react";
// import { FaHome, FaUsers, FaMapMarkedAlt, FaStar, FaMoneyBill, FaUndo } from "react-icons/fa";
// import { Link, useLocation } from 'react-router-dom';

//   function Sidebar() {
//     const location = useLocation();
  
//     const links = [
//       { to: '/', icon: <FaHome />, label: 'Dashboard' },
//       { to: '/tours', icon: <FaMapMarkedAlt />, label: 'Tours' },
//       { to: '/tours/add', label: 'Add Tour' },
//       { to: '/customers', icon: <FaUsers />, label: 'Customers' },
//       { to: '/reviews', icon: <FaStar />, label: 'Reviews' },
//       { to: '/payments', icon: <FaMoneyBill />, label: 'Payments' },
//       { to: '/refunds', icon: <FaUndo />, label: 'Refunds' },
//     ];
  
//     return (
//       <div className="w-64 bg-white shadow-md p-4 space-y-4">
//         <h1 className="text-2xl font-bold mb-6">Admin</h1>
//         {links.map((link) => (
//           <Link
//             key={link.to}
//             to={link.to}
//             className={`block px-4 py-2 rounded hover:bg-blue-100 ${
//               location.pathname === link.to ? 'bg-blue-200 font-semibold' : ''
//             }`}
//           >
//             {link.label}
//           </Link>
//         ))}
//       </div>
//     );
//   }
  
//   export default Sidebar;
  
import React from "react";
import { FaHome, FaMapMarkedAlt, FaUsers, FaStar, FaMoneyBill, FaUndo } from "react-icons/fa";

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, view: "dashboard" },
    { name: "Tours", icon: <FaMapMarkedAlt />, view: "tours" },
    { name: "Customers", icon: <FaUsers />, view: "customers" },
    { name: "Reviews", icon: <FaStar />, view: "reviews" },
    { name: "Payments", icon: <FaMoneyBill />, view: "payments" },
    { name: "Refunds", icon: <FaUndo />, view: "refunds" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">Admin Panel</div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setActiveView(item.view)}
            className={`flex items-center w-full px-4 py-2 rounded-md text-left ${
              activeView === item.view ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;