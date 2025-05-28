import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
