import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import { ProtectedRoute } from "./lib/protected-route";
import TourDetailPage from "@/pages/tour-detail-page";
import ToursPage from "@/pages/tours-page";
import ProfilePage from "@/pages/profile-page";
import BookingHistoryPage from "@/pages/booking-history-page";
import DestinationsPage from "@/pages/destinations-page";
import ContactPage from "@/pages/contact-page";
import AboutPage from "@/pages/about-page";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./hooks/use-auth";
import DashboardLayout from "./components/layout/dashboard-layout";

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/tours" component={ToursPage} />
        <Route path="/tours/:id" component={TourDetailPage} />
        <Route path="/destinations" component={DestinationsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
        <ProtectedRoute path="/bookings" component={BookingHistoryPage} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
