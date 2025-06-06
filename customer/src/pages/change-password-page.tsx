import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Clock,
  Info,
} from "lucide-react";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mật khẩu hiện tại là bắt buộc"),
    newPassword: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ hoa")
      .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ thường")
      .regex(/\d/, "Mật khẩu phải chứa ít nhất một số")
      .regex(/[^A-Za-z0-9]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const ChangePasswordPage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = form.watch("newPassword");

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    return Math.min(score, 100);
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength < 40) return "Yếu";
    if (strength < 70) return "Trung bình";
    return "Mạnh";
  };

  const passwordStrength = calculatePasswordStrength(newPassword || "");

  const onSubmit = async (data: ChangePasswordForm) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
      form.reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Thay đổi mật khẩu thất bại:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    {
      text: "Ít nhất 8 ký tự",
      met: (newPassword?.length || 0) >= 8,
    },
    {
      text: "Một chữ cái viết hoa",
      met: /[A-Z]/.test(newPassword || ""),
    },
    {
      text: "Một chữ cái viết thường",
      met: /[a-z]/.test(newPassword || ""),
    },
    {
      text: "Một số",
      met: /\d/.test(newPassword || ""),
    },
    {
      text: "Một ký tự đặc biệt",
      met: /[^A-Za-z0-9]/.test(newPassword || ""),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Thay Đổi Mật Khẩu | TravelTour</title>
        <meta
          name="description"
          content="Cập nhật mật khẩu tài khoản của bạn để tăng cường bảo mật."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
                Thay Đổi Mật Khẩu
              </h1>
              <p className="text-muted-foreground">
                Cập nhật mật khẩu của bạn để giữ an toàn cho tài khoản. Sử dụng
                mật khẩu mạnh mà bạn không sử dụng ở nơi khác.
              </p>
            </div>

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Mật khẩu của bạn đã được thay đổi thành công. Bạn sẽ vẫn được
                  đăng nhập trên thiết bị này.
                </AlertDescription>
              </Alert>
            )}

            {/* Security Tips */}
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Mẹo Bảo Mật Mật Khẩu
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>
                        • Sử dụng mật khẩu độc đáo mà bạn không dùng trên các
                        trang khác
                      </li>
                      <li>• Kết hợp chữ cái, số và ký tự đặc biệt</li>
                      <li>
                        • Cân nhắc sử dụng trình quản lý mật khẩu để bảo mật tốt
                        hơn
                      </li>
                      <li>
                        • Tránh sử dụng thông tin cá nhân như tên hoặc ngày sinh
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Change Password Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  Cập Nhật Mật Khẩu
                </CardTitle>
                <CardDescription>
                  Nhập mật khẩu hiện tại của bạn và chọn một mật khẩu mới mạnh
                  mẽ.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Current Password */}
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mật Khẩu Hiện Tại</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu hiện tại của bạn"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* New Password */}
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mật Khẩu Mới</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu mới của bạn"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                              >
                                {showNewPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password Strength Indicator */}
                    {newPassword && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Độ mạnh của mật khẩu:</span>
                          <span
                            className={`font-medium ${
                              passwordStrength < 40
                                ? "text-red-600"
                                : passwordStrength < 70
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {getStrengthText(passwordStrength)}
                          </span>
                        </div>
                        <Progress
                          value={passwordStrength}
                          className={`h-2 ${getStrengthColor(
                            passwordStrength
                          )}`}
                        />
                      </div>
                    )}

                    {/* Password Requirements */}
                    {newPassword && (
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center">
                          <Info className="h-4 w-4 mr-2" />
                          Yêu Cầu Mật Khẩu
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {passwordRequirements.map((req, index) => (
                            <div
                              key={index}
                              className="flex items-center text-sm"
                            >
                              {req.met ? (
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                              ) : (
                                <XCircle className="h-4 w-4 text-gray-400 mr-2" />
                              )}
                              <span
                                className={
                                  req.met
                                    ? "text-green-700"
                                    : "text-muted-foreground"
                                }
                              >
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Confirm Password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Xác Nhận Mật Khẩu Mới</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Xác nhận mật khẩu mới của bạn"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isLoading || passwordStrength < 70}
                        className="sm:order-2"
                      >
                        {isLoading ? "Đang Đổi Mật Khẩu..." : "Đổi Mật Khẩu"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        className="sm:order-1"
                      >
                        Hủy
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Additional Security Notice */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">
                      Sau Khi Đổi Mật Khẩu
                    </h3>
                    <p className="text-sm text-amber-800">
                      Bạn sẽ vẫn đăng nhập trên thiết bị này, nhưng bạn có thể
                      bị đăng xuất khỏi các thiết bị khác vì lý do bảo mật. Bạn
                      sẽ cần đăng nhập lại bằng mật khẩu mới trên các thiết bị
                      đó.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
