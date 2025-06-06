import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Settings,
  Bell,
  Eye,
  Lock,
  Key,
  RefreshCw,
  Download,
  Trash2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const GeneralSettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [animationReduced, setAnimationReduced] = useState(false);
  const [searchHistory, setSearchHistory] = useState(true);

  // Font size slider
  const [fontSize, setFontSize] = useState([16]);

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };

  const resetSettings = () => {
    setEmailNotifications(true);
    setPushNotifications(true);
    setMarketingEmails(false);
    setAutoSave(true);
    setHighContrast(false);
    setLargeText(false);
    setAnimationReduced(false);
    setSearchHistory(true);
    setFontSize([16]);
    document.documentElement.style.fontSize = "16px";
  };
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Cài Đặt Chung</h1>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="general">Chung</TabsTrigger>
            <TabsTrigger value="notifications">Thông Báo</TabsTrigger>
            <TabsTrigger value="accessibility">Trợ Năng</TabsTrigger>
            <TabsTrigger value="privacy">Quyền Riêng Tư & Dữ Liệu</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài Đặt Ứng Dụng</CardTitle>
                <CardDescription>
                  Tùy chỉnh cách ứng dụng hoạt động cho bạn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Tự động lưu tùy chọn</h3>
                      <p className="text-sm text-muted-foreground">
                        Tự động lưu bộ lọc tìm kiếm và tùy chọn của bạn
                      </p>
                    </div>
                    <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Tiền tệ mặc định</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <select
                        className="w-full p-2 border rounded-md"
                        defaultValue="usd"
                      >
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="jpy">JPY (¥)</option>
                        <option value="aud">AUD ($)</option>
                        <option value="cad">CAD ($)</option>
                        <option value="vnd">VND (₫)</option>
                      </select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Đơn vị khoảng cách</h3>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="distance" defaultChecked />
                        <span>Kilômét</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="distance" />
                        <span>Dặm</span>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Đơn vị nhiệt độ</h3>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="temperature" defaultChecked />
                        <span>Celsius</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="temperature" />
                        <span>Fahrenheit</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài Đặt Tài Khoản</CardTitle>
                <CardDescription>
                  Cập nhật thông tin tài khoản và tùy chọn của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="current-email">Email Hiện Tại</Label>
                      <Input
                        id="current-email"
                        value="user@example.com"
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-email">Email Mới</Label>
                      <Input
                        id="new-email"
                        placeholder="Nhập địa chỉ email mới"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="outline">Cập Nhật Email</Button>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="current-password">
                        Mật Khẩu Hiện Tại
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">Mật Khẩu Mới</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="outline">Thay Đổi Mật Khẩu</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài Đặt Thông Báo</CardTitle>
                <CardDescription>
                  Chọn cách thức và thời điểm bạn muốn được thông báo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Thông Báo Qua Email</h3>
                        <p className="text-sm text-muted-foreground">
                          Nhận xác nhận đặt chỗ và cập nhật qua email
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Thông Báo Đẩy</h3>
                        <p className="text-sm text-muted-foreground">
                          Nhận cảnh báo thời gian thực trên thiết bị của bạn
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Email Tiếp Thị</h3>
                        <p className="text-sm text-muted-foreground">
                          Nhận ưu đãi đặc biệt và khuyến mãi
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Tần Suất Thông Báo</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="frequency" defaultChecked />
                        <span>Thời gian thực</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="frequency" />
                        <span>Thông báo hàng ngày</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="frequency" />
                        <span>Thông báo hàng tuần</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài Đặt Trợ Năng</CardTitle>
                <CardDescription>
                  Tùy chỉnh ứng dụng để đáp ứng nhu cầu trợ năng của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Chế Độ Tương Phản Cao</h3>
                        <p className="text-sm text-muted-foreground">
                          Tăng độ tương phản để hiển thị tốt hơn
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={highContrast}
                      onCheckedChange={setHighContrast}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Văn Bản Lớn</h3>
                        <p className="text-sm text-muted-foreground">
                          Sử dụng văn bản lớn hơn trong toàn bộ ứng dụng
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={largeText}
                      onCheckedChange={setLargeText}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Giảm Hiệu Ứng</h3>
                        <p className="text-sm text-muted-foreground">
                          Giảm thiểu chuyển động và hiệu ứng
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={animationReduced}
                      onCheckedChange={setAnimationReduced}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Kích Thước Chữ</h3>
                      <span className="text-sm">{fontSize[0]}px</span>
                    </div>
                    <Slider
                      value={fontSize}
                      min={12}
                      max={24}
                      step={1}
                      onValueChange={handleFontSizeChange}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Nhỏ</span>
                      <span>Vừa</span>
                      <span>Lớn</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quyền Riêng Tư & Dữ Liệu</CardTitle>
                <CardDescription>
                  Quản lý cài đặt quyền riêng tư và dữ liệu cá nhân của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Lưu Lịch Sử Tìm Kiếm</h3>
                        <p className="text-sm text-muted-foreground">
                          Lưu trữ các tìm kiếm gần đây để truy cập nhanh hơn
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={searchHistory}
                      onCheckedChange={setSearchHistory}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Key className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Xác Thực Hai Yếu Tố</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Thêm một lớp bảo mật cho tài khoản của bạn
                    </p>
                    <Button variant="outline">Bật 2FA</Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Download className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Tải Xuống Dữ Liệu Của Bạn</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Nhận một bản sao của tất cả dữ liệu chúng tôi có về bạn
                    </p>
                    <Button variant="outline">Yêu Cầu Dữ Liệu</Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Trash2 className="h-5 w-5 text-destructive" />
                      <h3 className="font-medium">Xóa Tài Khoản</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Xóa vĩnh viễn tài khoản của bạn và tất cả dữ liệu liên
                      quan
                    </p>
                    <Button variant="destructive">Xóa Tài Khoản Của Tôi</Button>
                  </div>
                </div>
              </CardContent>
            </Card>{" "}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={resetSettings}>
            Đặt Lại Tất Cả Cài Đặt
          </Button>
          <Button>Lưu Thay Đổi</Button>{" "}
        </div>
      </div>
    </>
  );
};

export default GeneralSettingsPage;
