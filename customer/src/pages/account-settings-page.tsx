import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserCog,
  Edit,
  CreditCard,
  Key,
  Bell,
  Shield,
  Globe,
  Palette,
  Languages,
  Phone,
  Mail,
  Calendar,
  MapPin,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const AccountSettingsPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    dateOfBirth: "",
    country: "",
    city: "",
    bio: "",
    website: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    profilePublic: true,
    showOnlineStatus: true,
    allowMessaging: true,
    marketingEmails: false,
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const quickActions = [
    {
      title: "Chỉnh Sửa Hồ Sơ",
      description: "Cập nhật thông tin cá nhân của bạn",
      icon: Edit,
      href: "/profile",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Phương Thức Thanh Toán",
      description: "Quản lý thẻ thanh toán của bạn",
      icon: CreditCard,
      href: "/payment-methods",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Thay Đổi Mật Khẩu",
      description: "Cập nhật mật khẩu tài khoản của bạn",
      icon: Key,
      href: "/change-password",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Thông Báo",
      description: "Cấu hình tùy chọn thông báo",
      icon: Bell,
      href: "/notifications",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Quyền Riêng Tư & Bảo Mật",
      description: "Quản lý cài đặt bảo mật và quyền riêng tư",
      icon: Shield,
      href: "/privacy-security",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Giao Diện Màu Sắc",
      description: "Tùy chỉnh giao diện ứng dụng của bạn",
      icon: Palette,
      href: "/color-theme",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Cài Đặt Tài Khoản | TravelTour</title>
        <meta
          name="description"
          content="Quản lý cài đặt tài khoản và tùy chọn cá nhân của bạn."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
                Cài Đặt Tài Khoản
              </h1>
              <p className="text-muted-foreground">
                Quản lý thông tin tài khoản và tùy chọn cá nhân của bạn.
              </p>
            </div>

            {/* Account Status */}
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">
                      Tài Khoản Hoạt Động
                    </h3>
                    <p className="text-sm text-green-800">
                      Tài khoản của bạn đang hoạt động tốt. Tất cả tính năng đều
                      khả dụng.
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    Đã Xác Thực
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Settings */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserCog className="h-5 w-5 mr-2" />
                      Thông Tin Cá Nhân
                    </CardTitle>
                    <CardDescription>
                      Cập nhật thông tin cá nhân và thông tin liên hệ của bạn.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Tên</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Họ</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Địa Chỉ Email</Label>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Số Điện Thoại</Label>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="flex-1"
                          placeholder="+84 (123) 456-789"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth">Ngày Sinh</Label>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) =>
                              handleInputChange("dateOfBirth", e.target.value)
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="country">Quốc Gia</Label>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Select
                            value={formData.country}
                            onValueChange={(value) =>
                              handleInputChange("country", value)
                            }
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Chọn quốc gia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">Hoa Kỳ</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">Vương Quốc Anh</SelectItem>
                              <SelectItem value="de">Đức</SelectItem>
                              <SelectItem value="fr">Pháp</SelectItem>
                              <SelectItem value="jp">Nhật Bản</SelectItem>
                              <SelectItem value="au">Úc</SelectItem>
                              <SelectItem value="vn">Việt Nam</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="city">Thành Phố</Label>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className="flex-1"
                          placeholder="Nhập thành phố của bạn"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Tiểu Sử</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        placeholder="Hãy cho chúng tôi biết về bạn..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Trang Web</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button>Lưu Thay Đổi</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tùy Chọn Tài Khoản</CardTitle>
                    <CardDescription>
                      Cấu hình cách tài khoản của bạn hoạt động và thông tin nào
                      được chia sẻ.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Thông Báo Qua Email</span>
                        <p className="text-sm text-muted-foreground">
                          Nhận cập nhật quan trọng qua email
                        </p>
                      </div>
                      <Switch
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange("emailNotifications", checked)
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Thông Báo Qua SMS</span>
                        <p className="text-sm text-muted-foreground">
                          Nhận cảnh báo khẩn cấp qua tin nhắn
                        </p>
                      </div>
                      <Switch
                        checked={preferences.smsNotifications}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange("smsNotifications", checked)
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Hồ Sơ Công Khai</span>
                        <p className="text-sm text-muted-foreground">
                          Làm cho hồ sơ của bạn hiển thị với người dùng khác
                        </p>
                      </div>
                      <Switch
                        checked={preferences.profilePublic}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange("profilePublic", checked)
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">
                          Hiển Thị Trạng Thái Trực Tuyến
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Để người khác thấy khi bạn đang trực tuyến
                        </p>
                      </div>
                      <Switch
                        checked={preferences.showOnlineStatus}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange("showOnlineStatus", checked)
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Email Tiếp Thị</span>
                        <p className="text-sm text-muted-foreground">
                          Nhận nội dung và ưu đãi quảng cáo
                        </p>
                      </div>
                      <Switch
                        checked={preferences.marketingEmails}
                        onCheckedChange={(checked) =>
                          handlePreferenceChange("marketingEmails", checked)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Save Changes */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Hủy</Button>
                  <Button>Lưu Thay Đổi</Button>
                </div>
              </div>

              {/* Quick Actions Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thao Tác Nhanh</CardTitle>
                    <CardDescription>
                      Chuyển đến các mục cài đặt cụ thể.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {quickActions.map((action) => (
                      <Link key={action.href} href={action.href}>
                        <div className="flex items-center p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                          <div
                            className={`p-2 rounded-lg ${action.bgColor} mr-3`}
                          >
                            <action.icon
                              className={`h-4 w-4 ${action.color}`}
                            />
                          </div>
                          <div className="flex-1">
                            <span className="font-medium text-sm">
                              {action.title}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {action.description}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                {/* Account Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tổng Quan Tài Khoản</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Ngày Tham Gia
                      </span>
                      <span className="text-sm font-medium">Tháng 1, 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Tổng Số Đặt Chỗ
                      </span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Quốc Gia Đã Thăm
                      </span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Điểm Thưởng
                      </span>
                      <span className="text-sm font-medium">2,450</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Trạng Thái Tài Khoản
                      </span>
                      <Badge variant="default" className="text-xs">
                        Premium
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettingsPage;
