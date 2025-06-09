import { Link } from "wouter";
import DestinationCard from "@/components/tours/destination-card";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const fixedDestinations = [
  {
    destination: "Hạ Long",
    country: "Việt Nam",
    image:
      "https://vcdn1-dulich.vnecdn.net/2022/05/07/vinhHaLongQuangNinh-1651912066-8789-1651932294.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=bAYE9-ifwt-9mB2amIjnqg",
    tourCount: 12,
    rating: 4.8,
  },
  {
    destination: "Đà Nẵng",
    country: "Việt Nam",
    image:
      "https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA",
    tourCount: 18,
    rating: 4.7,
  },
  {
    destination: "Đà Lạt",
    country: "Việt Nam",
    image:
      "https://media.vneconomy.vn/images/upload/2023/07/06/1688465738-grasp-the-rainy-season-travel-tips-to-da-lat.jpg",
    tourCount: 14,
    rating: 4.6,
  },
  {
    destination: "Phú Quốc",
    country: "Việt Nam",
    image:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2025/06/02/du-lich-phu-quoc-4-ngay-3-dem-tu-ha-noi-1-0959.jpg",
    tourCount: 9,
    rating: 4.5,
  },
  {
    destination: "Sapa",
    country: "Việt Nam",
    image:
      "https://vcdn1-dulich.vnecdn.net/2022/04/18/dulichSaPa-1650268886-1480-1650277620.png?w=0&h=0&q=100&dpr=2&fit=crop&s=JTUw8njZ_Glkqf1itzjObg",
    tourCount: 11,
    rating: 4.4,
  },
  {
    destination: "Nha Trang",
    country: "Việt Nam",
    image:
      "https://vcdn1-dulich.vnecdn.net/2022/05/09/shutterstock-280926449-6744-15-3483-9174-1652070682.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=bGCo6Rv6DseMDE_07TT1Aw",
    tourCount: 16,
    rating: 4.6,
  },
  {
    destination: "Huế",
    country: "Việt Nam",
    image:
      "https://media.vietravel.com/images/Content/dia-diem-du-lich-hue-01.jpg",
    tourCount: 8,
    rating: 4.3,
  },
  {
    destination: "Hội An",
    country: "Việt Nam",
    image:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/03/du-lich-hoi-an-1-1542.jpg",
    tourCount: 15,
    rating: 4.9,
  },
  {
    destination: "Cần Thơ",
    country: "Việt Nam",
    image:
      "https://www.homecredit.vn/upload/2_cuoi_nam_la_thoi_diem_ly_tuong_de_kham_pha_ve_dep_cua_can_tho_91915554d9.jpg",
    tourCount: 7,
    rating: 4.2,
  },
  {
    destination: "Hồ Chí Minh",
    country: "Việt Nam",
    image:
      "https://imagevietnam.vnanet.vn//MediaUpload/Org/2024/05/18/hcml-318-15-19-9.jpg",
    tourCount: 20,
    rating: 4.5,
  },
];

const PopularDestinations = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-poppins text-foreground">
            Điểm Đến Phổ Biến
          </h2>
          <Link
            href="/destinations"
            className="text-primary font-medium hover:underline flex items-center"
          >
            <span>Xem tất cả điểm đến</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fixedDestinations
            ?.sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((destination) => (
              <DestinationCard
                key={destination.destination}
                destination={destination.destination}
                country={destination.country}
                image={destination.image}
                tourCount={destination.tourCount}
                rating={destination.rating}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
