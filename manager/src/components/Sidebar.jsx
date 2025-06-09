import {
  FaHome,
  FaMapMarkedAlt,
  FaUserTie,
  FaUsers,
  FaStar,
  FaMoneyBill,
  FaUndo,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, view: "dashboard", path: "/" },
    { name: "Tours", icon: <FaMapMarkedAlt />, view: "tours", path: "/tours" },
    {
      name: "Staffs",
      icon: <FaUserTie />,
      view: "staffs",
      path: "/staff",
    },
    {
      name: "Customers",
      icon: <FaUsers />,
      view: "customers",
      path: "/customers",
    },
    { name: "Reviews", icon: <FaStar />, view: "reviews", path: "/reviews" },
    {
      name: "Payments",
      icon: <FaMoneyBill />,
      view: "payments",
      path: "/payments",
    },
    // { name: "Refunds", icon: <FaUndo />, view: "refunds", path: "/refunds" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
      <div className="flex items-center justify-center p-4 text-2xl font-bold border-b border-gray-700">
        BK-TOUR
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.view}
            to={item.path}
            onClick={() => setActiveView(item.view)}
            className={({ isActive }) =>
              `flex items-center w-full px-4 py-2 rounded-md text-left ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
