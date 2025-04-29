import React from "react";

const TourList = () => {
  const tours = [
    { id: 1, title: "Beach Paradise", destination: "Maldives", price: 1200 },
    { id: 2, title: "Mountain Adventure", destination: "Nepal", price: 800 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Destination</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{tour.id}</td>
              <td className="border border-gray-300 px-4 py-2">{tour.title}</td>
              <td className="border border-gray-300 px-4 py-2">{tour.destination}</td>
              <td className="border border-gray-300 px-4 py-2">${tour.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourList;