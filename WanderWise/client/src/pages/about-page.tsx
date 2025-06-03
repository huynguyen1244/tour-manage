import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Map,
  Star,
  Award,
  GlobeLock,
  Headphones,
  Clock,
  Smile,
} from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Giới Thiệu | WanderWise</title>
        <meta
          name="description"
          content="Tìm hiểu về WanderWise - đối tác đáng tin cậy cho những trải nghiệm du lịch đặc biệt trên khắp thế giới."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div
          className="relative h-[300px] md:h-[400px] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-4 text-center">
              Giới Thiệu WanderWise
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-center">
              Tạo nên những trải nghiệm du lịch không thể quên từ năm 2010
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="container mx-auto py-16 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6">
                Câu Chuyện Của Chúng Tôi
              </h2>
              <p className="text-muted-foreground mb-4">
                Được thành lập vào năm 2010, WanderWise bắt đầu với một tầm nhìn
                đơn giản: tạo ra những trải nghiệm du lịch chân thực vượt ra
                ngoài những điểm thu hút khách du lịch thông thường và kết nối
                du khách với trái tim và tâm hồn của từng điểm đến.
              </p>
              <p className="text-muted-foreground mb-4">
                Bắt đầu từ một nhóm nhỏ những người đam mê du lịch, chúng tôi đã
                phát triển thành một cộng đồng khám phá toàn cầu. Những người
                sáng lập của chúng tôi, Alex và Maria Rodriguez, cũng là những
                du khách cuồng nhiệt, đã nhận thấy khoảng trống trên thị trường
                cho những trải nghiệm du lịch phong phú về văn hóa, không chỉ
                đơn thuần là tham quan các danh lam thắng cảnh.
              </p>
              <p className="text-muted-foreground">
                Ngày nay, chúng tôi cung cấp các tour được tuyển chọn đến hơn 50
                điểm đến trên toàn thế giới, mỗi tour được thiết kế cẩn thận để
                mang lại trải nghiệm chân thực và đáng nhớ. Chúng tôi tự hào đã
                giúp hơn 50.000 du khách tạo ra những kỷ niệm và kết nối lâu dài
                trên khắp thế giới.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Team members planning a trip"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Client consultation session"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Happy travelers on a tour"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Company celebration"
                className="rounded-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-muted py-16 px-4">
          <div className="container mx-auto">            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
                Sứ Mệnh & Giá Trị Của Chúng Tôi
              </h2>
              <p className="text-muted-foreground">
                Tại WanderWise, chúng tôi tin rằng du lịch có sức mạnh thay đổi
                cuộc sống, mở rộng tầm nhìn và tạo ra những kết nối ý nghĩa
                giữa các nền văn hóa. Sứ mệnh của chúng tôi là tạo điều kiện cho
                những trải nghiệm biến đổi này trong khi đảm bảo hoạt động của
                chúng tôi tác động tích cực đến các cộng đồng mà chúng tôi ghé thăm.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Map className="h-8 w-8 text-primary" />
                  </div>                  <h3 className="font-semibold text-lg mb-2">
                    Trải Nghiệm Chân Thực
                  </h3>
                  <p className="text-muted-foreground">
                    Chúng tôi thiết kế hành trình vượt ra ngoài các điểm du lịch
                    thông thường để khám phá tính cách và văn hóa thực sự của từng điểm đến.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>                  <h3 className="font-semibold text-lg mb-2">
                    Tác Động Cộng Đồng
                  </h3>
                  <p className="text-muted-foreground">
                    Chúng tôi hợp tác với các doanh nghiệp địa phương và hướng dẫn viên
                    để đảm bảo các tour của chúng tôi đóng góp tích cực cho cộng đồng mà chúng tôi ghé thăm.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <GlobeLock className="h-8 w-8 text-primary" />
                  </div>                  <h3 className="font-semibold text-lg mb-2">
                    Du Lịch Bền Vững
                  </h3>
                  <p className="text-muted-foreground">
                    Chúng tôi cam kết giảm thiểu tác động môi trường và thúc đẩy
                    các hoạt động du lịch có trách nhiệm và bền vững.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-primary" />
                  </div>                  
                  <h3 className="font-semibold text-lg mb-2">Xuất Sắc</h3>
                  <p className="text-muted-foreground">
                    Chúng tôi phấn đấu đạt được sự xuất sắc trong mọi khía cạnh
                    của dịch vụ, từ lập kế hoạch hành trình đến hỗ trợ thực địa.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="container mx-auto py-16 px-4">          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
              Tại Sao Chọn WanderWise?
            </h2>
            <p className="text-muted-foreground">
              Với hàng nghìn công ty du lịch để lựa chọn, đây là lý do tại sao
              du khách tiếp tục tin tưởng chúng tôi với những khoảnh khắc quý giá nhất của họ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>                <h3 className="font-semibold text-lg mb-2">
                  Dịch Vụ Đạt Giải Thưởng
                </h3>
                <p className="text-muted-foreground">
                  Được công nhận với nhiều giải thưởng ngành về dịch vụ
                  xuất sắc và thiết kế tour sáng tạo.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>                <h3 className="font-semibold text-lg mb-2">
                  Hướng Dẫn Viên Địa Phương Chuyên Nghiệp
                </h3>
                <p className="text-muted-foreground">
                  Hướng dẫn viên của chúng tôi là những người địa phương đầy
                  đam mê với kiến thức sâu sắc về khu vực của họ, mang đến những
                  hiểu biết mà bạn không thể tìm thấy trong sách hướng dẫn.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Smile className="h-6 w-6 text-primary" />
              </div>
              <div>                <h3 className="font-semibold text-lg mb-2">
                  98% Khách Hàng Hài Lòng
                </h3>
                <p className="text-muted-foreground">
                  Chúng tôi tự hào về những đánh giá cao nhất quán và phản hồi
                  tích cực mà chúng tôi nhận được từ những du khách hài lòng.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div>                
                <h3 className="font-semibold text-lg mb-2">Hỗ Trợ 24/7</h3>
                <p className="text-muted-foreground">
                  Đội ngũ hỗ trợ chuyên dụng của chúng tôi luôn sẵn sàng 24/7
                  để hỗ trợ bất kỳ câu hỏi hoặc quan ngại nào trong suốt hành trình của bạn.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Clock className="h-6 w-6 text-primary" />
              </div>              
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Lịch Trình Linh Hoạt
                </h3>
                <p className="text-muted-foreground">
                  Chúng tôi cung cấp nhiều ngày khởi hành và thường có thể
                  điều chỉnh thời gian phù hợp với lịch trình của bạn.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Map className="h-6 w-6 text-primary" />
              </div>              
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Hành Trình Độc Đáo
                </h3>
                <p className="text-muted-foreground">
                  Hành trình được tạo ra cẩn thận của chúng tôi kết hợp những
                  điểm nổi bật phổ biến với những viên ngọc ẩn để mang lại trải nghiệm du lịch thực sự độc đáo.
                </p>
              </div>
            </div>
          </div>          
          <
            div className="flex justify-center mt-12">
            <Button size="lg">Khám Phá Các Tour</Button>
          </>
        </div>

        {/* Team Section */}
        <div className="bg-muted py-16 px-4">
          <div className="container mx-auto">            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
                Gặp Gỡ Đội Ngũ Lãnh Đạo
              </h2>
              <p className="text-muted-foreground">
                Những cá nhân đầy đam mê đằng sau WanderWise, những người làm việc
                không mệt mỏi để tạo ra những trải nghiệm du lịch đặc biệt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Alex Rodriguez"
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">Alex Rodriguez</h3>
                  <p className="text-primary font-medium text-sm mb-2">
                    Co-Founder & CEO
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Một người du lịch suốt đời đã thăm hơn 70 quốc gia, 
                    Alex dẫn dắt tầm nhìn và hướng đi chiến lược của công ty chúng tôi.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Maria Rodriguez"
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">Maria Rodriguez</h3>                  
                  <p className="text-primary font-medium text-sm mb-2">
                    Đồng Sáng Lập & COO
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Với nền tảng về nhân học văn hóa, Maria đảm bảo
                    các tour của chúng tôi mang lại sự hòa nhập văn hóa chân thực.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="David Chen"
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">David Chen</h3>                  
                  <p className="text-primary font-medium text-sm mb-2">
                    Giám Đốc Tour
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Với 15 năm kinh nghiệm dẫn tour trên khắp châu Á và
                    châu Đại Dương, David giám sát hoạt động tour và đào tạo hướng dẫn viên của chúng tôi.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Sophia Martinez"
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">Sophia Martinez</h3>                  
                  <p className="text-primary font-medium text-sm mb-2">
                    Giám Đốc Phát Triển Bền Vững
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Một nhà môi trường đầy đam mê, Sophia dẫn dắt các sáng kiến của chúng tôi
                    để giảm thiểu dấu chân sinh thái và thúc đẩy du lịch có trách nhiệm.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
