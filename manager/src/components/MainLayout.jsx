import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside
        className={`bg-white shadow-md transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        } overflow-hidden`}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-16 bg-white shadow flex items-center justify-between px-4">
          <Header toggleSidebar={toggleSidebar} />
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
