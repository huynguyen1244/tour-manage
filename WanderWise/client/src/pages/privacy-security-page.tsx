import { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Key,
  AlertTriangle,
  CheckCircle,
  Globe,
  UserX,
  Download,
  Trash2,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";

const PrivacySecurityPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showBookingHistory: false,
    shareActivityStatus: true,
    allowMarketing: false,
    cookiesAnalytics: true,
    cookiesMarketing: false,
    cookiesPersonalization: true,
    dataSharing: false,
    locationTracking: false,
    emailDisclosure: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    loginNotifications: true,
    sessionTimeout: "30",
    autoLogout: true,
    suspiciousActivityAlerts: true,
    passwordExpiry: false,
  });

  const [loginSessions] = useState([
    {
      id: 1,
      device: "MacBook Pro - Chrome",
      location: "New York, NY",
      lastActive: "Đang hoạt động",
      current: true,
    },
    {
      id: 2,
      device: "iPhone 14 - Safari",
      location: "New York, NY",
      lastActive: "2 giờ trước",
      current: false,
    },
    {
      id: 3,
      device: "Windows PC - Edge",
      location: "Los Angeles, CA",
      lastActive: "3 ngày trước",
      current: false,
    },
  ]);

  const [dataRequests] = useState([
    {
      id: 1,
      type: "Xuất Dữ Liệu",
      status: "hoàn thành",
      date: "2024-01-15",
      description: "Xuất dữ liệu tài khoản",
    },
    {
      id: 2,
      type: "Xóa Dữ Liệu",
      status: "đang chờ",
      date: "2024-01-20",
      description: "Yêu cầu xóa lịch sử đặt chỗ",
    },
  ]);

  const handlePrivacyChange = (key: string, value: boolean | string) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSecurityChange = (key: string, value: boolean | string) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Quyền Riêng Tư & Bảo Mật | TravelTour</title>
        <meta
          name="description"
          content="Quản lý cài đặt quyền riêng tư và tùy chọn bảo mật của bạn."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
                Quyền Riêng Tư & Bảo Mật
              </h1>
              <p className="text-muted-foreground">
                Kiểm soát cài đặt quyền riêng tư và quản lý bảo mật tài khoản
                của bạn.
              </p>
            </div>

            {/* Security Overview */}
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">
                      Trạng Thái Bảo Mật: Tốt
                    </h3>
                    <p className="text-sm text-green-800">
                      Tài khoản của bạn có cài đặt bảo mật mạnh. Hãy xem xét bật
                      xác thực hai yếu tố để bảo vệ thêm.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Bảo Mật Tài Khoản
                </CardTitle>
                <CardDescription>
                  Quản lý mật khẩu và cài đặt xác thực của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Mật Khẩu Hiện Tại</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={passwordVisible ? "text" : "password"}
                        value="••••••••••"
                        readOnly
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        Đã thay đổi: 3 tháng trước
                      </span>
                      <Button variant="outline" size="sm">
                        <Key className="h-4 w-4 mr-2" />
                        Đổi Mật Khẩu
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Xác Thực Hai Yếu Tố
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Thêm một lớp bảo mật cho tài khoản của bạn
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!twoFactorEnabled && (
                        <Badge
                          variant="outline"
                          className="text-orange-600 border-orange-600"
                        >
                          Đề Xuất
                        </Badge>
                      )}
                      <Switch
                        checked={twoFactorEnabled}
                        onCheckedChange={setTwoFactorEnabled}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Thông Báo Đăng Nhập
                      </span>
                      <Switch
                        checked={securitySettings.loginNotifications}
                        onCheckedChange={(checked) =>
                          handleSecurityChange("loginNotifications", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Cảnh Báo Hoạt Động Đáng Ngờ
                      </span>
                      <Switch
                        checked={securitySettings.suspiciousActivityAlerts}
                        onCheckedChange={(checked) =>
                          handleSecurityChange(
                            "suspiciousActivityAlerts",
                            checked
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Đăng Xuất Tự Động
                      </span>
                      <Switch
                        checked={securitySettings.autoLogout}
                        onCheckedChange={(checked) =>
                          handleSecurityChange("autoLogout", checked)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Thời Gian Phiên (phút)</Label>
                    <Select
                      value={securitySettings.sessionTimeout}
                      onValueChange={(value) =>
                        handleSecurityChange("sessionTimeout", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 phút</SelectItem>
                        <SelectItem value="30">30 phút</SelectItem>
                        <SelectItem value="60">1 giờ</SelectItem>
                        <SelectItem value="120">2 giờ</SelectItem>
                        <SelectItem value="never">Không bao giờ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Phiên Đăng Nhập Đang Hoạt Động
                </CardTitle>
                <CardDescription>
                  Quản lý các phiên đăng nhập đang hoạt động của bạn trên các
                  thiết bị.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loginSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            session.current ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <Smartphone
                            className={`h-4 w-4 ${
                              session.current
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">
                              {session.device}
                            </span>
                            {session.current && (
                              <Badge
                                variant="secondary"
                                className="ml-2 text-xs"
                              >
                                Hiện Tại
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {session.location}
                            <Clock className="h-3 w-3 ml-3 mr-1" />
                            {session.lastActive}
                          </div>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="outline" size="sm">
                          <UserX className="h-4 w-4 mr-2" />
                          Thu Hồi
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Đăng Xuất Tất Cả Các Phiên Khác
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Cài Đặt Quyền Riêng Tư
                </CardTitle>
                <CardDescription>
                  Kiểm soát cách thông tin của bạn được chia sẻ và sử dụng.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Hiển Thị Hồ Sơ</Label>
                  <Select
                    value={privacySettings.profileVisibility}
                    onValueChange={(value) =>
                      handlePrivacyChange("profileVisibility", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Công Khai</SelectItem>
                      <SelectItem value="friends">Chỉ Bạn Bè</SelectItem>
                      <SelectItem value="private">Riêng Tư</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Hiển Thị Lịch Sử Đặt Chỗ
                    </span>
                    <Switch
                      checked={privacySettings.showBookingHistory}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange("showBookingHistory", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Chia Sẻ Trạng Thái Hoạt Động
                    </span>
                    <Switch
                      checked={privacySettings.shareActivityStatus}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange("shareActivityStatus", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Cho Phép Nhận Thông Tin Tiếp Thị
                    </span>
                    <Switch
                      checked={privacySettings.allowMarketing}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange("allowMarketing", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theo Dõi Vị Trí</span>
                    <Switch
                      checked={privacySettings.locationTracking}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange("locationTracking", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Quản Lý Dữ Liệu
                </CardTitle>
                <CardDescription>
                  Tải xuống hoặc xóa dữ liệu cá nhân của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto flex-col p-6">
                    <Download className="h-6 w-6 mb-2" />
                    <span className="font-medium">Xuất Dữ Liệu</span>
                    <span className="text-xs text-muted-foreground text-center">
                      Tải xuống dữ liệu tài khoản của bạn
                    </span>
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-auto flex-col p-6 border-red-200 hover:border-red-300"
                      >
                        <Trash2 className="h-6 w-6 mb-2 text-red-600" />
                        <span className="font-medium text-red-600">
                          Xóa Tài Khoản
                        </span>
                        <span className="text-xs text-muted-foreground text-center">
                          Xóa vĩnh viễn tài khoản của bạn
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center text-red-600">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          Xóa Tài Khoản
                        </DialogTitle>
                        <DialogDescription>
                          Hành động này không thể hoàn tác. Điều này sẽ xóa vĩnh
                          viễn tài khoản của bạn và xóa tất cả dữ liệu của bạn
                          khỏi máy chủ của chúng tôi.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                          Để xác nhận, hãy gõ <strong>DELETE</strong> vào ô bên
                          dưới:
                        </p>
                        <Input
                          className="mt-2"
                          placeholder="Gõ DELETE để xác nhận"
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Hủy</Button>
                        <Button variant="destructive">Xóa Tài Khoản</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Data Requests History */}
                <div>
                  <h3 className="font-medium mb-3">
                    Lịch Sử Yêu Cầu Dữ Liệu Gần Đây
                  </h3>
                  <div className="space-y-2">
                    {dataRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-3 border rounded"
                      >
                        <div>
                          <span className="font-medium">{request.type}</span>
                          <p className="text-sm text-muted-foreground">
                            {request.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              request.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {request.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {request.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Settings */}
            <div className="flex justify-end">
              <Button>Lưu Cài Đặt Quyền Riêng Tư & Bảo Mật</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacySecurityPage;
