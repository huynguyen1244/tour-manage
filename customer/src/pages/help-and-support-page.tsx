import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  HelpCircle,
  MessageCircle,
  Book,
  FileText,
  Phone,
  Mail,
  Video,
} from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";

const HelpAndSupportPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Hỗ Trợ & Trợ Giúp</h1>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="faq">Câu Hỏi Thường Gặp</TabsTrigger>
            <TabsTrigger value="contact">Liên Hệ Với Chúng Tôi</TabsTrigger>
            <TabsTrigger value="documentation">Tài Liệu Hướng Dẫn</TabsTrigger>
            <TabsTrigger value="tutorials">Hướng Dẫn</TabsTrigger>
          </TabsList>
          <TabsContent value="faq" className="space-y-6">
            {" "}
            <Card>
              <CardHeader>
                <CardTitle>Câu Hỏi Thường Gặp</CardTitle>
                <CardDescription>
                  Tìm câu trả lời cho những câu hỏi phổ biến nhất về việc sử
                  dụng WanderWise.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Làm thế nào để đặt tour?
                    </AccordionTrigger>
                    <AccordionContent>
                      Để đặt tour, duyệt qua các tour có sẵn của chúng tôi, chọn
                      tour bạn quan tâm và nhấp vào nút "Đặt Ngay". Làm theo
                      hướng dẫn để chọn ngày ưa thích, số người đi và bất kỳ tùy
                      chọn bổ sung nào. Hoàn tất quy trình thanh toán để hoàn
                      thành việc đặt tour.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Làm thế nào để hủy hoặc sửa đổi đặt tour của tôi?
                    </AccordionTrigger>
                    <AccordionContent>
                      Bạn có thể hủy hoặc sửa đổi đặt tour bằng cách điều hướng
                      đến "Đặt Tour Của Tôi" trong bảng điều khiển tài khoản của
                      bạn. Chọn đặt tour bạn muốn thay đổi và nhấp vào "Hủy Đặt
                      Tour" hoặc "Sửa Đổi Đặt Tour". Xin lưu ý rằng các chính
                      sách hủy khác nhau tùy theo tour và khung thời gian.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Bạn chấp nhận những phương thức thanh toán nào?
                    </AccordionTrigger>
                    <AccordionContent>
                      Chúng tôi chấp nhận các thẻ tín dụng chính (Visa,
                      Mastercard, American Express), PayPal, và ở một số khu
                      vực, chúng tôi cung cấp Apple Pay và Google Pay. Bạn có
                      thể quản lý phương thức thanh toán của mình trong phần
                      "Phương Thức Thanh Toán" của tài khoản.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Bảo hiểm du lịch có được bao gồm trong đặt tour của tôi
                      không?
                    </AccordionTrigger>
                    <AccordionContent>
                      Bảo hiểm du lịch không được tự động bao gồm trong đặt tour
                      của bạn. Tuy nhiên, chúng tôi rất khuyên bạn mua bảo hiểm
                      du lịch cho chuyến đi của bạn. Bạn có thể thêm bảo hiểm
                      trong quá trình thanh toán hoặc sắp xếp riêng thông qua
                      nhà cung cấp ưa thích của bạn.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      Làm thế nào để tôi để lại đánh giá cho một tour?
                    </AccordionTrigger>
                    <AccordionContent>
                      Sau khi hoàn thành một tour, bạn sẽ nhận được email mời để
                      lại đánh giá. Ngoài ra, bạn có thể đi đến "Đặt Tour Của
                      Tôi" trong bảng điều khiển tài khoản của bạn, tìm tour đã
                      hoàn thành và nhấp vào "Để Lại Đánh Giá". Phản hồi của bạn
                      giúp những du khách khác và các nhà điều hành tour của
                      chúng tôi cải thiện dịch vụ của họ.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contact" className="space-y-6">
            {" "}
            <Card>
              <CardHeader>
                <CardTitle>Liên Hệ Hỗ Trợ</CardTitle>
                <CardDescription>
                  Liên hệ với đội ngũ hỗ trợ khách hàng của chúng tôi để nhận
                  trợ giúp cá nhân.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Gửi tin nhắn cho chúng tôi
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-1"
                        >
                          Họ tên
                        </label>
                        <Input id="name" placeholder="Họ tên của bạn" />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-1"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Địa chỉ email của bạn"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium mb-1"
                        >
                          Chủ đề
                        </label>
                        <Input
                          id="subject"
                          placeholder="Nội dung về vấn đề gì?"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-1"
                        >
                          Tin nhắn
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Chúng tôi có thể giúp gì cho bạn?"
                          rows={5}
                        />
                      </div>
                      <Button className="w-full">Gửi Tin Nhắn</Button>
                    </form>
                  </div>{" "}
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Các cách khác để kết nối
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Phone className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium">Hỗ Trợ Qua Điện Thoại</p>
                          <p className="text-sm text-muted-foreground">
                            +1 (800) 123-4567
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Thứ Hai-Thứ Sáu, 9am-6pm EST
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Mail className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium">Hỗ Trợ Qua Email</p>
                          <p className="text-sm text-muted-foreground">
                            support@wanderwise.com
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Thời gian phản hồi: 24-48 giờ
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MessageCircle className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium">Trò Chuyện Trực Tuyến</p>
                          <p className="text-sm text-muted-foreground">
                            Hoạt động 24/7
                          </p>
                          <Button variant="outline" className="mt-2">
                            Bắt Đầu Trò Chuyện
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Video className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-medium">Hỗ Trợ Qua Video</p>
                          <p className="text-sm text-muted-foreground">
                            Đặt cuộc gọi video với đội ngũ hỗ trợ của chúng tôi
                          </p>
                          <Button variant="outline" className="mt-2">
                            Lên Lịch Cuộc Gọi
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>{" "}
          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tài Liệu Hướng Dẫn</CardTitle>
                <CardDescription>
                  Hướng dẫn và tài nguyên toàn diện để sử dụng WanderWise.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Hướng Dẫn Người Dùng",
                      description:
                        "Hướng dẫn đầy đủ để sử dụng nền tảng WanderWise",
                      icon: Book,
                    },
                    {
                      title: "Quy Trình Đặt Tour",
                      description: "Hướng dẫn từng bước để đặt tour",
                      icon: FileText,
                    },
                    {
                      title: "Thanh Toán & Hoàn Tiền",
                      description:
                        "Hiểu về phương thức thanh toán và chính sách hoàn tiền",
                      icon: FileText,
                    },
                    {
                      title: "Quản Lý Tài Khoản",
                      description: "Quản lý hồ sơ và tùy chọn của bạn",
                      icon: FileText,
                    },
                    {
                      title: "Tài Nguyên Du Lịch",
                      description:
                        "Tài nguyên hữu ích cho trước và trong chuyến đi của bạn",
                      icon: FileText,
                    },
                    {
                      title: "Tài Liệu API",
                      description:
                        "Dành cho nhà phát triển tích hợp với nền tảng của chúng tôi",
                      icon: FileText,
                    },
                  ].map((doc, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="p-4 border-b">
                        <div className="flex items-center space-x-2">
                          <doc.icon className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">{doc.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          {doc.description}
                        </p>
                        <Button variant="outline" size="sm">
                          Xem Tài Liệu
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>{" "}
          <TabsContent value="tutorials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Hướng Dẫn</CardTitle>
                <CardDescription>
                  Học cách sử dụng WanderWise với các hướng dẫn video từng bước
                  của chúng tôi.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Bắt Đầu Với WanderWise",
                      duration: "5:24",
                      thumbnail: "https://placehold.co/400x225",
                    },
                    {
                      title: "Cách Đặt Tour Hoàn Hảo",
                      duration: "8:12",
                      thumbnail: "https://placehold.co/400x225",
                    },
                    {
                      title: "Quản Lý Các Đặt Tour Của Bạn",
                      duration: "3:45",
                      thumbnail: "https://placehold.co/400x225",
                    },
                    {
                      title: "Tùy Chỉnh Hồ Sơ Người Dùng",
                      duration: "4:18",
                      thumbnail: "https://placehold.co/400x225",
                    },
                  ].map((video, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg border bg-card shadow"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full bg-black/50 hover:bg-black/70"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-8 w-8"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="text-base font-medium">{video.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HelpAndSupportPage;
