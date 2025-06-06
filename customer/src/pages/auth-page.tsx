import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, loginSchema, registerSchema } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe, Mail, Lock, User, Phone } from "lucide-react";
import { Link } from "wouter";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { loginMutation, registerMutation, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user?.role) {
      if (user.role === "customer") {
        window.location.href = "http://localhost:3000";
      } else if (
        user.role === "manager" ||
        user.role === "admin" ||
        user.role === "staff"
      ) {
        window.location.href = "http://localhost:3005";
      }
    }
  }, [user]);

  // Login form
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const onLoginSubmit = (data: any) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: any) => {
    registerMutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Đăng nhập hoặc Đăng ký | WanderWise</title>
        <meta
          name="description"
          content="Đăng nhập hoặc tạo tài khoản để đặt tour và quản lý trải nghiệm du lịch của bạn."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <div className="flex-grow grid md:grid-cols-2">
          {/* Auth Form Section */}
          <div className="flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center md:text-left">
                <Link
                  href="/"
                  className="flex items-center justify-center md:justify-start"
                >
                  <Globe className="h-8 w-8 text-primary mr-2" />
                  <span className="text-2xl font-bold font-poppins text-primary">
                    BK-Tour
                  </span>
                </Link>
                <h1 className="mt-6 text-3xl font-bold font-poppins text-foreground">
                  {activeTab === "login"
                    ? "Chào mừng trở lại"
                    : "Tạo tài khoản"}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {activeTab === "login"
                    ? "Đăng nhập để truy cập tài khoản của bạn"
                    : "Tham gia với chúng tôi để khám phá những điểm đến tuyệt vời"}
                </p>
              </div>

              <Tabs
                defaultValue="login"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                {" "}
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                  <TabsTrigger value="register">Đăng ký</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form
                      onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nhập email của bạn</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Nhập email của bạn"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between items-center">
                              <FormLabel>Mật khẩu</FormLabel>
                              <Link
                                href="#"
                                className="text-sm text-primary hover:underline"
                              >
                                Quên mật khẩu?
                              </Link>
                            </div>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />{" "}
                                <Input
                                  type="password"
                                  placeholder="Nhập mật khẩu"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center">
                        <Checkbox id="remember" />
                        <label
                          htmlFor="remember"
                          className="ml-2 text-sm text-muted-foreground"
                        >
                          Ghi nhớ đăng nhập
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending
                          ? "Đang đăng nhập..."
                          : "Đăng nhập"}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Chưa có tài khoản?{" "}
                      <button
                        onClick={() => setActiveTab("register")}
                        className="text-primary hover:underline font-medium"
                      >
                        Đăng ký
                      </button>
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form
                      onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            {" "}
                            <FormLabel>Tên người dùng</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Chọn tên người dùng"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />{" "}
                                <Input
                                  type="email"
                                  placeholder="Nhập email của bạn"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Số điện thoại (Không bắt buộc)
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="0912 345 678"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type="password"
                                  placeholder="Tạo mật khẩu mạnh"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Xác nhận mật khẩu</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type="password"
                                  placeholder="Xác nhận mật khẩu của bạn"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center">
                        <Checkbox id="terms" />
                        <label
                          htmlFor="terms"
                          className="ml-2 text-sm text-muted-foreground"
                        >
                          Tôi đồng ý với{" "}
                          <Link
                            href="#"
                            className="text-primary hover:underline"
                          >
                            Điều khoản và Điều kiện
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="#"
                            className="text-primary hover:underline"
                          >
                            Chính sách bảo mật
                          </Link>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending
                          ? "Đang tạo tài khoản..."
                          : "Đăng ký"}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Đã có tài khoản?{" "}
                      <button
                        onClick={() => setActiveTab("login")}
                        className="text-primary hover:underline font-medium"
                      >
                        Đăng nhập
                      </button>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Hero Section */}
          <div className="hidden md:block bg-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/40">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=1200&q=80"
                alt="Travel"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
              />
            </div>
            <div className="relative h-full flex flex-col justify-center p-10 text-white">
              <h2 className="text-4xl font-bold font-poppins mb-4">
                Your Journey Begins Here
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Khám phá những điểm đến tuyệt vời với WanderWise
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="bg-white/20 rounded-full p-1 mr-3">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Các tour và trải nghiệm cao cấp được chọn lọc</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-white/20 rounded-full p-1 mr-3">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Đặt chỗ an toàn với chính sách hủy linh hoạt</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-white/20 rounded-full p-1 mr-3">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Hướng dẫn chuyên gia và dịch vụ cá nhân hóa</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-white/20 rounded-full p-1 mr-3">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>
                    Hỗ trợ khách hàng 24/7 trong suốt hành trình của bạn
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
