import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Globe,
  Send,
  CheckCircle,
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Chủ đề phải có ít nhất 5 ký tự" }),
  message: z.string().min(10, { message: "Tin nhắn phải có ít nhất 10 ký tự" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // In a real application, you would send this data to your backend
    console.log(data);

    // Simulate successful form submission
    setTimeout(() => {
      setFormSubmitted(true);
      toast({
        title: "Tin nhắn đã được gửi thành công",
        description: "Chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.",
      });
    }, 1000);
  };

  return (
    <>
      {" "}
      <Helmet>
        <title>Liên Hệ | WanderWise</title>
        <meta
          name="description"
          content="Liên hệ với các chuyên gia du lịch của chúng tôi. Chúng tôi ở đây để giúp bạn lập kế hoạch cho chuyến đi hoàn hảo."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header Banner */}
        <div
          className="relative h-[250px] md:h-[300px] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
          }}
        >
          {" "}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-2 text-center">
              Liên Hệ
            </h1>
            <p className="text-lg max-w-2xl text-center">
              Các chuyên gia du lịch của chúng tôi sẵn sàng giúp bạn lên kế
              hoạch cho cuộc phiêu lưu hoàn hảo
            </p>
          </div>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Có thắc mắc về các chuyến tham quan của chúng tôi hoặc cần giúp
                đỡ trong việc lập kế hoạch cho chuyến đi của bạn? Đội ngũ thân
                thiện của chúng tôi ở đây để hỗ trợ bạn. Hãy điền vào mẫu đơn
                hoặc liên hệ với chúng tôi trực tiếp qua thông tin liên hệ bên
                dưới.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-start p-6">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Our Address</h3>
                      <p className="text-muted-foreground">
                        123 Lê Thanh Nghị, <br />
                        Hai Bà Trưng, <br />
                        Hà Nội
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start p-6">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">
                        Email cho chúng tôi
                      </h3>
                      <p className="text-muted-foreground">
                        info@traveltour.com
                      </p>
                      <p className="text-muted-foreground">
                        bookings@traveltour.com
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start p-6">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">
                        Gọi chúng tôi
                      </h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">+1 (800) TOUR-NOW</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start p-6">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">
                        Thời gian hoạt động
                      </h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-muted-foreground">
                        Saturday: 10:00 AM - 4:00 PM
                      </p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <Globe className="h-6 w-6 text-primary mr-2" />
                    <h2 className="text-2xl font-bold font-poppins">
                      Gửi tin cho chúng tôi
                    </h2>
                  </div>

                  {formSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <CheckCircle className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Cảm ơn!</h3>
                      <p className="text-muted-foreground mb-4 text-center">
                        Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ
                        liên hệ lại với bạn sớm nhất có thể.
                      </p>
                      <Button
                        className="mt-6"
                        onClick={() => {
                          setFormSubmitted(false);
                          form.reset();
                        }}
                      >
                        Gửi tin nhắn khác
                      </Button>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tên đầy đủ</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="+1 (555) 123-4567"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Tour inquiry"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tin nhắn của bạn</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Nói cho chúng tôi biết về yêu cầu của bạn..."
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full">
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-[400px] mt-12">
          <div className="bg-muted h-full w-full flex items-center justify-center">
            <div className="text-center">
              <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Chúng tôi có mặt trên toàn cầu! Bạn có thể tìm thấy chúng tôi
                tại nhiều địa điểm khác nhau. Hãy liên hệ với chúng tôi để biết
                thêm thông tin chi tiết.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
