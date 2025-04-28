import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, ChevronDown, Menu, X, Globe } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (user: any) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user.username ? user.username[0].toUpperCase() : "U";
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white ${
        isScrolled ? "shadow-md" : ""
      } transition-shadow duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <Globe className="h-8 w-8 text-primary mr-2" />
              <span className="text-2xl font-bold font-poppins text-primary">
                TravelTour
              </span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/"
                className={`font-medium ${
                  location === "/"
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } transition`}
              >
                Home
              </Link>
              <Link
                href="/tours"
                className={`font-medium ${
                  location === "/tours" || location.startsWith("/tours/")
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } transition`}
              >
                Tours
              </Link>
              <Link
                href="/destinations"
                className={`font-medium ${
                  location === "/destinations"
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } transition`}
              >
                Destinations
              </Link>
              <Link
                href="/about"
                className={`font-medium ${
                  location === "/about"
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } transition`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`font-medium ${
                  location === "/contact"
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } transition`}
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 focus:outline-none">
                      <Avatar>
                        <AvatarFallback>{getInitials(user)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {user.firstName || user.username}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer w-full">
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/bookings" className="cursor-pointer w-full">
                        My Bookings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex space-x-3">
                  <Button
                    variant="ghost"
                    className="text-primary hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/auth">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link
              href="/"
              className={`block py-2 font-medium ${
                location === "/" ? "text-primary" : "text-foreground"
              } hover:text-primary transition`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tours"
              className={`block py-2 font-medium ${
                location === "/tours" || location.startsWith("/tours/")
                  ? "text-primary"
                  : "text-foreground"
              } hover:text-primary transition`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tours
            </Link>
            <Link
              href="/destinations"
              className={`block py-2 font-medium ${
                location === "/destinations" ? "text-primary" : "text-foreground"
              } hover:text-primary transition`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link
              href="/about"
              className={`block py-2 font-medium ${
                location === "/about" ? "text-primary" : "text-foreground"
              } hover:text-primary transition`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block py-2 font-medium ${
                location === "/contact" ? "text-primary" : "text-foreground"
              } hover:text-primary transition`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-3 border-t border-gray-200">
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full mb-2"
                    >
                      My Profile
                    </Button>
                  </Link>
                  <Link href="/bookings" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full mb-2"
                    >
                      My Bookings
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full mb-2 border-primary text-primary hover:bg-blue-50"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
