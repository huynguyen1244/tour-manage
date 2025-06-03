import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User, Mail, Phone, Shield, LogOut, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";

// Create schema for profile form
const profileFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfilePage = () => {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const res = await apiRequest("PUT", "/api/user/profile", data);
      return await res.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["/api/user"], {
        ...user,
        ...updatedUser,
      });

      toast({
        title: "Hồ sơ đã cập nhật",
        description: "Thông tin hồ sơ của bạn đã được cập nhật thành công.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Cập nhật thất bại",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user?.username ? user.username[0].toUpperCase() : "U";
  };
  return (
    <>
      <Helmet>
        <title>Hồ Sơ Của Tôi | TravelTour</title>
        <meta
          name="description"
          content="Quản lý tài khoản TravelTour và thông tin hồ sơ của bạn."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
            Hồ Sơ Của Tôi
          </h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản và thông tin cá nhân của bạn
          </p>{" "}
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          orientation="vertical"
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-bold">
                    {user?.firstName
                      ? `${user.firstName} ${user.lastName || ""}`
                      : user?.username}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>

                <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
                  <TabsTrigger
                    value="profile"
                    className="justify-start data-[state=active]:bg-muted w-full px-3"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Thông Tin Cá Nhân
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="justify-start data-[state=active]:bg-muted w-full px-3"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Bảo Mật
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="justify-start data-[state=active]:bg-muted w-full px-3"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Tùy Chọn
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng Xuất
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Truy Cập Nhanh
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/bookings">Xem Đặt Tour Của Tôi</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/tours">Duyệt Các Tour</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông Tin Cá Nhân</CardTitle>
                    <CardDescription>
                      Cập nhật thông tin cá nhân và thông tin liên hệ của bạn.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tên</FormLabel>
                                <FormControl>
                                  <Input placeholder="Văn" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Họ</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nguyễn" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Số Điện Thoại</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="+84 123 456 789"
                                    className="pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormDescription>
                                Được sử dụng cho xác nhận đặt chỗ và cập nhật
                                tour.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            disabled={updateProfileMutation.isPending}
                          >
                            {updateProfileMutation.isPending
                              ? "Đang Lưu..."
                              : "Lưu Thay Đổi"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Thông Tin Tài Khoản</CardTitle>
                    <CardDescription>
                      Xem chi tiết tài khoản của bạn.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Tên Người Dùng
                        </div>
                        <div className="font-medium">{user?.username}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Địa Chỉ Email
                        </div>
                        <div className="font-medium">{user?.email}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Tài Khoản Được Tạo
                        </div>
                        <div className="font-medium">
                          {user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Bảo Mật Tài Khoản</CardTitle>
                    <CardDescription>
                      Quản lý mật khẩu và cài đặt bảo mật của bạn.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Tính Năng Sắp Ra Mắt</AlertTitle>
                      <AlertDescription>
                        Chức năng thay đổi mật khẩu sẽ có trong bản cập nhật
                        tương lai.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Mật Khẩu</h3>
                        <p className="text-muted-foreground mb-4">
                          Mật khẩu thay đổi lần cuối: Chưa bao giờ
                        </p>
                        <Button variant="outline" disabled>
                          Thay Đổi Mật Khẩu
                        </Button>
                      </div>

                      <div className="pt-6 border-t border-border">
                        <h3 className="text-lg font-medium mb-2">
                          Xác Thực Hai Yếu Tố
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Thêm một lớp bảo mật cho tài khoản của bạn bằng cách
                          bật xác thực hai yếu tố.
                        </p>
                        <Button variant="outline" disabled>
                          Bật 2FA
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="preferences" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Tùy Chọn Email</CardTitle>
                    <CardDescription>
                      Quản lý cách chúng tôi liên lạc với bạn.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Tính Năng Sắp Ra Mắt</AlertTitle>
                      <AlertDescription>
                        Cài đặt tùy chọn email sẽ có trong bản cập nhật tương
                        lai.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Cấu hình loại email bạn nhận được từ chúng tôi, bao gồm
                        các ưu đãi khuyến mãi, xác nhận đặt tour, và thông báo
                        du lịch.
                      </p>
                      <Button variant="outline" disabled>
                        Cập Nhật Tùy Chọn
                      </Button>
                    </div>
                  </CardContent>
                </Card>{" "}
              </TabsContent>{" "}
            </div>
          </div>{" "}
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;
