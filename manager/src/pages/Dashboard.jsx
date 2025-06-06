import { useEffect, useState } from "react";

const Dashboard = () => {
  const [totalTours, setTotalTours] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Giả lập fetch data từ API
  useEffect(() => {
    setTotalTours(120);
    setTotalCustomers(450);
    setTotalRevenue(25000);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium">Total Tours</h3>
          <p className="text-2xl font-bold text-blue-600">{totalTours}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium">Total Customers</h3>
          <p className="text-2xl font-bold text-green-600">{totalCustomers}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium">Total Revenue</h3>
          <p className="text-2xl font-bold text-yellow-600">${totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
