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
  Bell,
  Mail,
  MessageSquare,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Settings2,
  Clock,
  Filter,
  Palette,
} from "lucide-react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState({
    // Email Notifications
    emailBookingConfirmation: true,
    emailBookingReminders: true,
    emailPromotions: false,
    emailNewsletters: true,
    emailSecurityAlerts: true,

    // Push Notifications
    pushBookingUpdates: true,
    pushPromotions: false,
    pushReminders: true,
    pushSecurityAlerts: true,

    // SMS Notifications
    smsBookingConfirmation: false,
    smsEmergencyAlerts: true,

    // In-App Notifications
    inAppMessages: true,
    inAppUpdates: true,
    inAppPromotions: false,
  });

  const [preferences, setPreferences] = useState({
    frequency: "immediate",
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
    language: "en",
    timezone: "auto",
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const notificationGroups = [
    {
      title: "Thông Báo Qua Email",
      icon: Mail,
      description: "Nhận cập nhật qua email",
      items: [
        {
          key: "emailBookingConfirmation",
          label: "Xác Nhận Đặt Tour",
          description: "Nhận email xác nhận khi bạn đặt tour",
          important: true,
        },
        {
          key: "emailBookingReminders",
          label: "Nhắc Nhở Đặt Tour",
          description: "Nhắc nhở về các tour sắp tới",
        },
        {
          key: "emailPromotions",
          label: "Email Khuyến Mãi",
          description: "Nhận thông tin về ưu đãi và giảm giá đặc biệt",
        },
        {
          key: "emailNewsletters",
          label: "Bản Tin Du Lịch",
          description: "Nhận thông tin du lịch hàng tháng và điểm đến nổi bật",
        },
        {
          key: "emailSecurityAlerts",
          label: "Cảnh Báo Bảo Mật",
          description: "Thông báo quan trọng về bảo mật tài khoản",
          important: true,
        },
      ],
    },
    {
      title: "Thông Báo Đẩy",
      icon: Smartphone,
      description: "Nhận thông báo ngay lập tức trên thiết bị của bạn",
      items: [
        {
          key: "pushBookingUpdates",
          label: "Cập Nhật Đặt Tour",
          description: "Nhận cập nhật thời gian thực về đặt tour của bạn",
          important: true,
        },
        {
          key: "pushPromotions",
          label: "Khuyến Mãi",
          description:
            "Nhận thông báo về ưu đãi và giảm giá trong thời gian giới hạn",
        },
        {
          key: "pushReminders",
          label: "Nhắc Nhở Du Lịch",
          description: "Nhắc nhở về thời gian làm thủ tục, giờ khởi hành",
        },
        {
          key: "pushSecurityAlerts",
          label: "Cảnh Báo Bảo Mật",
          description: "Thông báo về các sự kiện và cố gắng đăng nhập bảo mật",
          important: true,
        },
      ],
    },
    {
      title: "Thông Báo Qua SMS",
      icon: MessageSquare,
      description: "Nhận tin nhắn văn bản trên điện thoại của bạn",
      items: [
        {
          key: "smsBookingConfirmation",
          label: "Xác Nhận Đặt Tour",
          description: "Nhận tin nhắn SMS xác nhận cho các đặt tour thành công",
        },
        {
          key: "smsEmergencyAlerts",
          label: "Cảnh Báo Khẩn Cấp",
          description:
            "Thông báo về các tình huống khẩn cấp và cảnh báo du lịch",
          important: true,
        },
      ],
    },
    {
      title: "Thông Báo Trong Ứng Dụng",
      icon: Bell,
      description: "Nhận thông báo trong ứng dụng",
      items: [
        {
          key: "inAppMessages",
          label: "Tin Nhắn",
          description:
            "Tin nhắn từ bộ phận hỗ trợ khách hàng và hướng dẫn viên",
        },
        {
          key: "inAppUpdates",
          label: "Cập Nhật Hệ Thống",
          description:
            "Thông tin về các bản cập nhật và tính năng mới của ứng dụng",
        },
        {
          key: "inAppPromotions",
          label: "Biểu Ngữ Khuyến Mãi",
          description: "Nội dung khuyến mãi trong ứng dụng",
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Cài Đặt Thông Báo | TravelTour</title>
        <meta
          name="description"
          content="Quản lý sở thích nhận thông báo về đặt tour, khuyến mãi và cập nhật."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
                Cài Đặt Thông Báo
              </h1>
              <p className="text-muted-foreground">
                Chọn cách và thời gian bạn muốn nhận thông báo về đặt tour và
                tài khoản của mình.
              </p>
            </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const allOff = Object.fromEntries(
                        Object.keys(notifications).map((key) => [key, false])
                      ) as typeof notifications;
                      setNotifications({
                        ...allOff,
                        emailSecurityAlerts: true,
                        pushSecurityAlerts: true,
                        smsEmergencyAlerts: true,
                      });
                    }}
                  >
                    <VolumeX className="h-4 w-4 mr-2" />
                    Tắt Tất Cả (Giữ Bảo Mật)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Use type assertion to ensure type compatibility
                      const allOn = Object.fromEntries(
                        Object.keys(notifications).map((key) => [key, true])
                      ) as typeof notifications;
                      setNotifications(allOn);
                    }}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Bật Tất Cả Thông Báo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Groups */}
            <div className="space-y-6 mb-8">
              {notificationGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <Card key={group.title}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Icon className="h-5 w-5 mr-2" />
                        {group.title}
                      </CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {group.items.map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <h3 className="font-medium">{item.label}</h3>
                              {item.important && (
                                <Badge
                                  variant="secondary"
                                  className="ml-2 text-xs"
                                >
                                  Quan Trọng
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <Switch
                            checked={
                              notifications[
                                item.key as keyof typeof notifications
                              ]
                            }
                            onCheckedChange={(checked) =>
                              handleNotificationChange(item.key, checked)
                            }
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Notification Preferences */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings2 className="h-5 w-5 mr-2" />
                  Tùy Chỉnh Thông Báo
                </CardTitle>
                <CardDescription>
                  Tùy chỉnh cách và thời gian bạn nhận thông báo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Tần Suất Thông Báo
                    </label>
                    <Select
                      value={preferences.frequency}
                      onValueChange={(value) =>
                        handlePreferenceChange("frequency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Ngay Lập Tức</SelectItem>
                        <SelectItem value="hourly">Theo Giờ</SelectItem>
                        <SelectItem value="daily">Hàng Ngày</SelectItem>
                        <SelectItem value="weekly">Hàng Tuần</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Giờ Im Lặng
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Tạm dừng thông báo không khẩn cấp trong giờ quy định
                      </p>
                    </div>
                    <Switch
                      checked={preferences.quietHours}
                      onCheckedChange={(checked) =>
                        handlePreferenceChange("quietHours", checked)
                      }
                    />
                  </div>

                  {preferences.quietHours && (
                    <div className="grid grid-cols-2 gap-4 pl-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Giờ Bắt Đầu
                        </label>
                        <Select
                          value={preferences.quietStart}
                          onValueChange={(value) =>
                            handlePreferenceChange("quietStart", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => {
                              const hour = i.toString().padStart(2, "0");
                              return (
                                <SelectItem key={hour} value={`${hour}:00`}>
                                  {hour}:00
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Giờ Kết Thúc
                        </label>
                        <Select
                          value={preferences.quietEnd}
                          onValueChange={(value) =>
                            handlePreferenceChange("quietEnd", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => {
                              const hour = i.toString().padStart(2, "0");
                              return (
                                <SelectItem key={hour} value={`${hour}:00`}>
                                  {hour}:00
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Ngôn Ngữ Thông Báo
                    </label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) =>
                        handlePreferenceChange("language", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">Tiếng Anh</SelectItem>
                        <SelectItem value="es">Tiếng Tây Ban Nha</SelectItem>
                        <SelectItem value="fr">Tiếng Pháp</SelectItem>
                        <SelectItem value="de">Tiếng Đức</SelectItem>
                        <SelectItem value="it">Tiếng Ý</SelectItem>
                        <SelectItem value="pt">Tiếng Bồ Đào Nha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Múi Giờ
                    </label>
                    <Select
                      value={preferences.timezone}
                      onValueChange={(value) =>
                        handlePreferenceChange("timezone", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Tự động phát hiện</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Giờ Đông</SelectItem>
                        <SelectItem value="PST">Giờ Tây</SelectItem>
                        <SelectItem value="CET">
                          Giờ Trung Bình Châu Âu
                        </SelectItem>
                        <SelectItem value="JST">Giờ Chuẩn Nhật Bản</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Settings */}
            <div className="flex justify-end">
              <Button>Lưu Cài Đặt Thông Báo</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
