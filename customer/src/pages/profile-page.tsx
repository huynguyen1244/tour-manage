import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios";

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

const profileFormSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfilePage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  const { data: userData, isLoading } = useQuery({
    queryKey: ["customer-infor"],
    queryFn: async () => {
      const res = await apiClient.get("/api/customers/get-infor");
      return (res as any).data;
    },
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name || "",
        phone: userData.phone || "",
      });
    }
  }, [userData]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const res = await apiClient.put("/api/customers/update-infor", data);
      return (res as any).data;
    },
    onSuccess: () => {
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin đã được cập nhật.",
      });
    },
    onError: (error: any) => {
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

  const getInitials = () => {
    if (userData?.name) {
      return userData.name
        .split(" ")
        .map((word: string) => word[0])
        .join("")
        .toUpperCase();
    }
    return "U";
  };

  if (isLoading) return <div className="p-6">Đang tải thông tin...</div>;

  return (
    <>
      <Helmet>
        <title>Hồ Sơ Của Tôi | TravelTour</title>
        <meta
          name="description"
          content="Quản lý tài khoản TravelTour của bạn."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
            Hồ Sơ Của Tôi
          </h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản và thông tin cá nhân của bạn
          </p>
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
                  <h2 className="text-lg font-bold">{userData?.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {userData?.email}
                  </p>
                </div>

                <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
                  <TabsTrigger
                    value="profile"
                    className="justify-start w-full px-3 data-[state=active]:bg-muted"
                  >
                    <User className="h-4 w-4 mr-2" /> Thông Tin Cá Nhân
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="justify-start w-full px-3 data-[state=active]:bg-muted"
                  >
                    <Shield className="h-4 w-4 mr-2" /> Bảo Mật
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="justify-start w-full px-3 data-[state=active]:bg-muted"
                  >
                    <Mail className="h-4 w-4 mr-2" /> Tùy Chọn
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Đăng Xuất
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
                      Cập nhật thông tin cá nhân của bạn.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Họ và Tên</FormLabel>
                              <FormControl>
                                <Input placeholder="Nguyễn Văn A" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
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
                                Dùng để xác nhận đặt chỗ và thông báo.
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
                              ? "Đang lưu..."
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
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Email
                        </div>
                        <div className="font-medium">{userData?.email}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Tài khoản tạo ngày
                        </div>
                        <div className="font-medium">
                          {new Date(userData?.created_at).toLocaleDateString(
                            "vi-VN"
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Vai trò
                        </div>
                        <div className="font-medium">{userData?.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Bảo Mật Tài Khoản</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Tính năng sắp ra mắt</AlertTitle>
                      <AlertDescription>
                        Thay đổi mật khẩu sẽ sớm có mặt.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Tùy Chọn Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Sắp có</AlertTitle>
                      <AlertDescription>
                        Cài đặt tùy chọn email sẽ có trong bản cập nhật tương
                        lai.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;
