import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { apiClient } from "@/services/axios";

type Category = {
  name: string;
  description: string;
  image: string;
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Gọi API một lần khi component mounted
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/categories");
        setCategories(response as any);
        setFilteredCategories(response as any);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Lọc dữ liệu khi searchTerm thay đổi
  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Danh mục tour</title>
      </Helmet>

      {/* Banner */}
      <div
        className="relative h-[300px] md:h-[400px] w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://stories.baothanhhoa.vn/assets/2fpVwTpxPE/sam-son-4096x2304.jpg')",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-4 text-center">
            Hãy Tìm Kiếm Tour Du lịch Phù Hợp Với Mong Muốn Của Bạn
          </h1>
          <p className="text-lg md:text-xl text-center mb-8">
            Khám phá tour với những đặc điểm riêng biệt
          </p>

          <form
            onSubmit={handleSearch}
            className="w-full max-w-xl flex gap-2 items-center bg-white rounded-lg p-1"
          >
            <Input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow border-none focus:ring-0 text-foreground"
            />
            <Button type="submit" size="sm" className="px-4">
              <Search className="h-4 w-4 mr-2" /> Tìm kiếm
            </Button>
          </form>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-8">
          Các Danh Mục Tour
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <CardContent className="p-5">
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      Khám Phá
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              Không tìm thấy danh mục phù hợp với "{searchTerm}"
            </p>
            <Button
              variant="link"
              onClick={() => setSearchTerm("")}
              className="mt-2"
            >
              Xóa tìm kiếm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
