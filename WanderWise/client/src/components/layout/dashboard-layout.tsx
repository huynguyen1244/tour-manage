import { ReactNode, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import {
  User,
  CreditCard,
  Home,
  Map,
  CalendarDays,
  Settings,
  MessageSquare,
  Star,
  PanelLeft,
  PanelLeftClose,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const [location] = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarLinks = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Destinations", icon: Map, path: "/destinations" },
    { name: "My Bookings", icon: CalendarDays, path: "/bookings" },
    { name: "Tours", icon: Map, path: "/tours" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Payment Methods", icon: CreditCard, path: "/payment-methods" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Reviews", icon: Star, path: "/reviews" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getInitials = (user: any) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user?.username ? user.username[0].toUpperCase() : "U";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
            sidebarCollapsed ? "w-[80px]" : "w-[250px]"
          )}
        >
          <div className="p-4 flex items-center justify-between border-b border-border">
            <div
              className={cn(
                "flex items-center gap-3",
                sidebarCollapsed && "justify-center w-full"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                {user ? getInitials(user) : "G"}
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <span className="font-medium">
                    {user ? user.firstName || user.username : "Guest"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user ? "Member" : "Welcome"}
                  </span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-muted-foreground"
            >
              {sidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            </Button>
          </div>

          <nav className="py-4 flex-1">
            <ul className="space-y-1 px-2">
              {sidebarLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <div
                      className={cn(
                        "flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer",
                        location === link.path
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-foreground hover:text-primary",
                        sidebarCollapsed ? "justify-center" : ""
                      )}
                    >
                      <link.icon
                        className={cn("h-5 w-5", sidebarCollapsed ? "mr-0" : "mr-3")}
                      />
                      {!sidebarCollapsed && (
                        <span className="flex-1">{link.name}</span>
                      )}
                      {!sidebarCollapsed && location === link.path && (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-border">
            {!sidebarCollapsed ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Back to Home
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                <Home size={18} />
              </Button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;