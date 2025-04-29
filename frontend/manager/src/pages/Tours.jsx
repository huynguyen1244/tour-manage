import React, { useEffect, useState } from "react";
import TourList from "../components/TourList";

const ToursPage = () => {
  const [tours, setTours] = useState([]);

  // Fetch tours data from API
  useEffect(() => {
    // Giả lập fetch data từ API
    setTours([
      { id: 1, title: "Đà Lạt 3n2d", destination: "Đà Lạt", price: 1200 },
      { id: 2, title: "Cát Bà 2n1d", destination: "Cát Bà", price: 800 },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý Tours</h2>
      <TourList tours={tours} />
    </div>
  );
};

export default ToursPage;
