import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Check,
  Eye,
  RefreshCw,
  Sparkles,
  Contrast,
  Paintbrush,
} from "lucide-react";

const ColorThemePage = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    {
      id: "light",
      name: "Chế Độ Sáng",
      description: "Giao diện sáng và rõ ràng",
      icon: Sun,
      preview: "bg-white border-gray-200 text-gray-900",
    },
    {
      id: "dark",
      name: "Chế Độ Tối",
      description: "Dễ chịu hơn cho mắt trong điều kiện ánh sáng yếu",
      icon: Moon,
      preview: "bg-gray-900 border-gray-700 text-white",
    },
    {
      id: "system",
      name: "Theo Hệ Thống",
      description: "Theo cài đặt thiết bị của bạn",
      icon: Monitor,
      preview:
        "bg-gradient-to-r from-white to-gray-900 border-gray-400 text-gray-600",
    },
  ];

  const accentColors = [
    {
      name: "Xanh Dương",
      value: "blue",
      class: "bg-blue-500",
      description: "Chuyên nghiệp và đáng tin cậy",
    },
    {
      name: "Xanh Lá",
      value: "green",
      class: "bg-green-500",
      description: "Tự nhiên và thư thái",
    },
    {
      name: "Tím",
      value: "purple",
      class: "bg-purple-500",
      description: "Sáng tạo và hiện đại",
    },
    {
      name: "Cam",
      value: "orange",
      class: "bg-orange-500",
      description: "Năng động và ấm áp",
    },
    {
      name: "Đỏ",
      value: "red",
      class: "bg-red-500",
      description: "Mạnh mẽ và sôi động",
    },
    {
      name: "Hồng",
      value: "pink",
      class: "bg-pink-500",
      description: "Vui tươi và thân thiện",
    },
  ];

  const [selectedAccent, setSelectedAccent] = useState("blue");

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Giao Diện Màu | TravelTour</title>
        <meta
          name="description"
          content="Tùy chỉnh trải nghiệm hình ảnh của bạn với các chủ đề màu và điểm nhấn khác nhau."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
                Giao Diện Màu
              </h1>
              <p className="text-muted-foreground">
                Tùy chỉnh trải nghiệm hình ảnh của bạn bằng cách chọn chủ đề phù
                hợp nhất cho bạn.
              </p>
            </div>

            {/* Current Theme Preview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Xem Trước Giao Diện Hiện Tại
                </CardTitle>
                <CardDescription>
                  Xem giao diện hiện tại của bạn với các phần tử khác nhau.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Thẻ Tour Mẫu</h3>
                    <Badge>Nổi Bật</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Đây là cách nội dung của bạn sẽ xuất hiện với giao diện đã
                    chọn.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm">Đặt Ngay</Button>
                    <Button variant="outline" size="sm">
                      Tìm Hiểu Thêm
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Contrast className="h-5 w-5 mr-2" />
                  Chế Độ Giao Diện
                </CardTitle>
                <CardDescription>
                  Chọn giữa giao diện sáng, tối, hoặc theo hệ thống.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = theme === option.id;

                    return (
                      <div key={option.id} className="relative">
                        <button
                          onClick={() => setTheme(option.id)}
                          className={`w-full p-4 rounded-lg border-2 transition-all hover:border-primary/50 ${
                            isSelected ? "border-primary" : "border-border"
                          }`}
                        >
                          <div
                            className={`h-16 rounded-md mb-3 flex items-center justify-center ${option.preview}`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <h3 className="font-semibold mb-1">{option.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </button>
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Accent Colors */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Paintbrush className="h-5 w-5 mr-2" />
                  Màu Nhấn
                </CardTitle>
                <CardDescription>
                  Chọn màu nhấn cho nút, liên kết và điểm nổi bật.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {accentColors.map((color) => (
                    <div key={color.value} className="relative">
                      <button
                        onClick={() => setSelectedAccent(color.value)}
                        className={`w-full p-4 rounded-lg border-2 transition-all hover:border-gray-300 ${
                          selectedAccent === color.value
                            ? "border-gray-400"
                            : "border-border"
                        }`}
                      >
                        <div
                          className={`h-8 w-8 rounded-full ${color.class} mx-auto mb-2`}
                        />
                        <h3 className="font-medium mb-1">{color.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {color.description}
                        </p>
                      </button>
                      {selectedAccent === color.value && (
                        <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advanced Options */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Tùy Chọn Nâng Cao
                </CardTitle>
                <CardDescription>
                  Các tùy chọn tùy chỉnh bổ sung cho giao diện của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Chế Độ Tương Phản Cao</h3>
                    <p className="text-sm text-muted-foreground">
                      Tăng độ tương phản để trợ năng tốt hơn
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Bật
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Giảm Chuyển Động</h3>
                    <p className="text-sm text-muted-foreground">
                      Giảm thiểu hiệu ứng và chuyển động
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Cấu Hình
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">CSS Tùy Chỉnh</h3>
                    <p className="text-sm text-muted-foreground">
                      Áp dụng kiểu dáng tùy chỉnh của riêng bạn
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Nâng Cao
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reset Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Đặt Lại & Khôi Phục
                </CardTitle>
                <CardDescription>
                  Đặt lại cài đặt giao diện của bạn về giá trị mặc định.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTheme("light");
                      setSelectedAccent("blue");
                    }}
                  >
                    Đặt Lại Về Giao Diện Sáng
                  </Button>
                  <Button variant="outline" onClick={() => setTheme("system")}>
                    Sử Dụng Cài Đặt Hệ Thống
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorThemePage;
