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
import {
  User,
  ChevronDown,
  Menu,
  X,
  Globe,
  Settings,
  Palette,
  Moon,
  Sun,
  Monitor,
  UserCog,
  Bell,
  Shield,
  Languages,
  HelpCircle,
  LogOut,
  Edit,
  CreditCard,
  Key,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("system"); // "light", "dark", "system"

  const handleLogout = () => {
    logout();
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // Apply theme logic here
    const root = document.documentElement;

    if (newTheme === "dark") {
      root.classList.add("dark");
    } else if (newTheme === "light") {
      root.classList.remove("dark");
    } else {
      // System theme
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemPrefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    // Initialize theme
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    handleThemeChange(savedTheme);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (user: any) => {
    if (user.name) {
      return `${user.name[0].toUpperCase()}`;
    }
    return user.name ? user.name[0].toUpperCase() : "U";
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
                BK-Tour
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
                Trang chủ
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
                href="/categories"
                className={`font-medium ${
                  location === "/categories"
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } transition`}
              >
                Danh mục
              </Link>
              <Link
                href="/destinations"
                className={`font-medium ${
                  location === "/destinations"
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } transition`}
              >
                Điểm đến
              </Link>
              <Link
                href="/about"
                className={`font-medium ${
                  location === "/about"
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } transition`}
              >
                Giới thiệu
              </Link>
              <Link
                href="/contact"
                className={`font-medium ${
                  location === "/contact"
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } transition`}
              >
                Liên hệ
              </Link>
            </nav>
          </div>{" "}
          <div className="flex items-center space-x-4">
            {" "}
            <div className="hidden md:flex items-center gap-x-4">
              {/* Cart & Wishlist */}
              <Link
                href="/cart"
                className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg transition"
              >
                <ShoppingCart className="h-5 w-5" />
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center gap-2 bg-pink-100 text-pink-600 hover:bg-pink-200 px-4 py-2 rounded-lg transition"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Avatar hoặc Đăng nhập/Đăng ký */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 focus:outline-none">
                      <Avatar>
                        <AvatarFallback>{getInitials(user)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer w-full">
                        Hồ sơ của tôi
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/bookings" className="cursor-pointer w-full">
                        Đặt chỗ của tôi
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      Đăng xuất
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
                    <Link href="/auth">Đăng nhập</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth">Đăng ký</Link>
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
            {/* Page Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {" "}
                {/* Theme Section */}
                <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                  Giao diện
                </div>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleThemeChange("light")}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Chế độ sáng
                  {theme === "light" && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleThemeChange("dark")}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Chế độ tối
                  {theme === "dark" && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleThemeChange("system")}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Theo hệ thống
                  {theme === "system" && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* Appearance Section */}
                <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                  Giao diện
                </div>{" "}
                <DropdownMenuItem asChild>
                  <Link href="/color-theme" className="cursor-pointer w-full">
                    <Palette className="h-4 w-4 mr-2" />
                    Màu chủ đề
                  </Link>
                </DropdownMenuItem>{" "}
                <DropdownMenuItem asChild>
                  <Link
                    href="/language-settings"
                    className="cursor-pointer w-full"
                  >
                    <Languages className="h-4 w-4 mr-2" />
                    Ngôn ngữ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator /> {/* Account Section */}
                {user && (
                  <>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                      Tài khoản
                    </div>{" "}
                    <DropdownMenuItem asChild>
                      <Link
                        href="/account-settings"
                        className="cursor-pointer w-full"
                      >
                        <UserCog className="h-4 w-4 mr-2" />
                        Cài đặt tài khoản
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh sửa hồ sơ
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/payment-methods"
                        className="cursor-pointer w-full"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Phương thức thanh toán
                      </Link>
                    </DropdownMenuItem>{" "}
                    <DropdownMenuItem asChild>
                      <Link
                        href="/change-password"
                        className="cursor-pointer w-full"
                      >
                        <Key className="h-4 w-4 mr-2" />
                        Đổi mật khẩu
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/notifications"
                        className="cursor-pointer w-full"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Thông báo
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/privacy-security"
                        className="cursor-pointer w-full"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Bảo mật & Riêng tư
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}{" "}
                {/* General Section */}{" "}
                <DropdownMenuItem asChild>
                  <Link
                    href="/help-and-support"
                    className="cursor-pointer w-full"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Trợ giúp & Hỗ trợ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/general-settings"
                    className="cursor-pointer w-full"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Cài đặt chung
                  </Link>
                </DropdownMenuItem>
                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 py-3 space-y-2">
            {" "}
            <Link
              href="/"
              className={`block py-2 font-medium ${
                location === "/" ? "text-primary" : "text-foreground"
              } hover:text-primary transition`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Trang chủ
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
                location === "/destinations"
                  ? "text-primary"
                  : "text-foreground"
              } hover:text-primary transition`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Điểm đến
            </Link>
            <Link
              href="/about"
              className={`block py-2 font-medium ${
                location === "/about" ? "text-primary" : "text-foreground"
              } hover:text-primary transition`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Giới thiệu
            </Link>{" "}
            <Link
              href="/contact"
              className={`block py-2 font-medium ${
                location === "/contact" ? "text-primary" : "text-foreground"
              } hover:text-primary transition`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Liên hệ
            </Link>{" "}
            {/* Page Settings for Mobile */}
            <div className="pt-2 border-t border-gray-200">
              <div className="py-2 font-medium text-foreground">Cài đặt</div>
              {/* Theme Settings */}
              <div className="pl-4 space-y-2">
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  Giao diện
                </div>
                <button
                  className={`flex items-center w-full text-left py-1 text-sm hover:text-primary ${
                    theme === "light" ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => handleThemeChange("light")}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Chế độ sáng
                  {theme === "light" && <span className="ml-auto">✓</span>}
                </button>
                <button
                  className={`flex items-center w-full text-left py-1 text-sm hover:text-primary ${
                    theme === "dark" ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => handleThemeChange("dark")}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Chế độ tối
                  {theme === "dark" && <span className="ml-auto">✓</span>}
                </button>
                <button
                  className={`flex items-center w-full text-left py-1 text-sm hover:text-primary ${
                    theme === "system"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => handleThemeChange("system")}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Theo hệ thống
                  {theme === "system" && <span className="ml-auto">✓</span>}
                </button>
              </div>
              {/* Appearance Settings */}
              <div className="pl-4 space-y-2 mt-3">
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  Appearance
                </div>{" "}
                <Link
                  href="/color-theme"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center w-full text-left py-1 text-sm text-muted-foreground hover:text-primary"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Màu chủ đề
                </Link>{" "}
                <Link
                  href="/language-settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center w-full text-left py-1 text-sm text-muted-foreground hover:text-primary"
                >
                  <Languages className="h-4 w-4 mr-2" />
                  Ngôn ngữ
                </Link>
              </div>
              {/* Account Settings for Mobile */}
              {user && (
                <div className="pl-4 space-y-2 mt-3">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Tài khoản
                  </div>{" "}
                  <Link
                    href="/account-settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center w-full text-left py-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    <UserCog className="h-4 w-4 mr-2" />
                    Cài đặt tài khoản
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center w-full text-left py-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa hồ sơ
                  </Link>
                  <Link
                    href="/payment-methods"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center w-full text-left py-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Phương thức thanh toán
                  </Link>{" "}
                  <Link
                    href="/change-password"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center w-full text-left py-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Đổi mật khẩu
                  </Link>
                  <Link
                    href="/notifications"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center w-full text-left py-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Thông báo
                  </Link>
                  <Link
                    href="/privacy-security"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center w-full text-left py-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Bảo mật & Riêng tư
                  </Link>
                </div>
              )}
              {/* General Settings */}{" "}
              <div className="pl-4 space-y-2 mt-3">
                <Link
                  href="/help-and-support"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center w-full text-left py-1 text-sm text-muted-foreground hover:text-primary"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Trợ giúp & Hỗ trợ
                </Link>
                <Link
                  href="/general-settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center w-full text-left py-1 text-sm text-muted-foreground hover:text-primary"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Cài đặt chung
                </Link>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full mb-2">
                      Thông tin cá nhân
                    </Button>
                  </Link>
                  <Link
                    href="/bookings"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full mb-2">
                      Đặt chỗ của tôi
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Đăng xuất
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
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link
                    href="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button className="w-full">Đăng ký</Button>
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
