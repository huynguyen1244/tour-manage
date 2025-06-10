import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { apiClient } from "@/services/axios";
import TourCard from "@/components/tours/tour-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  ArrowUpDown,
  SlidersHorizontal,
  X,
  Search,
  Calendar,
  Star,
  Filter,
} from "lucide-react";

interface Image {
  _id: string;
  url: string;
  public_id: string;
}

interface ItineraryItem {
  _id: string;
  day: string;
  description: string;
}

interface Tour {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  start_location: string;
  destinations: string[];
  price: number;
  capacity: number;
  available_slots: number;
  schedule: string;
  start_date: string;
  end_date: string;
  transport: string;
  includes: string[];
  excludes: string[];
  policies: string;
  itinerary: ItineraryItem[];
  images: Image[];
  status: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

type FilterState = {
  name: string; // lọc theo tên
  location: string; // địa điểm chính
  start_location: string; // điểm xuất phát
  destination: string; // điểm đến (trong mảng destinations)
  price: string; // khoảng giá, ví dụ "100-500"
  duration: string; // khoảng thời gian "3-7"
  schedule: string; // lịch trình dạng chuỗi
  status: string; // trạng thái tour (vd: "active", "inactive")
  capacity: string; // sức chứa tối đa (so sánh <=)
  slots_gte: string; // số slot còn trống (>=)
  start_date: string; // ngày bắt đầu (định dạng ISO string)
  end_date: string; // ngày kết thúc (định dạng ISO string)
  transport: string; // phương tiện di chuyển
  category: string; // loại tour
  include: string; // tiện ích bao gồm (includes)
  exclude: string; // tiện ích không bao gồm (excludes)
  sort_by: string; // trường sắp xếp (vd: "price", "created_at")
  sort_order: string; // "asc" hoặc "desc"
};

const DEFAULT_FILTERS: FilterState = {
  name: "",
  location: "",
  start_location: "",
  destination: "",
  price: "",
  duration: "",
  schedule: "",
  status: "available",
  capacity: "",
  slots_gte: "",
  start_date: "",
  end_date: "",
  transport: "",
  category: "",
  include: "",
  exclude: "",
  sort_by: "created_at",
  sort_order: "desc",
};

const SORT_OPTIONS = [
  { value: "price-asc", label: "Giá: Thấp → Cao" },
  { value: "price-desc", label: "Giá: Cao → Thấp" },
  { value: "created_at-desc", label: "Mới nhất" },
  { value: "created_at-asc", label: "Cũ nhất" },
];

const TRANSPORT_OPTIONS = [
  { value: "Xe khách", label: "Xe khách" },
  { value: "Máy bay", label: "Máy bay" },
  { value: "Tàu hỏa", label: "Tàu hỏa" },
  { value: "Ô tô", label: "Ô tô" },
  { value: "Xe máy", label: "Xe máy" },
  { value: "Xe du lịch", label: "Xe du lịch" },
];

// Utility function to build query params
const buildQueryParams = (filterParams: FilterState): URLSearchParams => {
  const queryParams = new URLSearchParams();

  // Add filters based on FilterState structure
  Object.entries(filterParams).forEach(([key, value]) => {
    if (typeof value === "string" && value.trim() !== "") {
      // Skip default values
      const defaultValue = DEFAULT_FILTERS[key as keyof FilterState];
      if (value !== defaultValue) {
        queryParams.set(key, value);
      }
    }
  });

  return queryParams;
};

// Utility function to parse URL params
const parseUrlParams = (
  searchParams: URLSearchParams
): Partial<FilterState> => {
  const filters: Partial<FilterState> = {};

  searchParams.forEach((value, key) => {
    if (key in DEFAULT_FILTERS) {
      filters[key as keyof FilterState] = value;
    }
  });

  return filters;
};

const ToursPage: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useLocation();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [quickSearch, setQuickSearch] = useState("");
  const [CATEGORY_OPTIONS, setCategories] = useState([]);

  // Parse URL parameters on mount and location change
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilters = parseUrlParams(urlParams);

    const fetchCategories = async () => {
      try {
        const res = await apiClient.get("/categories");
        const categories = (res as any) || [];
        const mapped = categories.map((cat: any) => ({
          value: cat._id,
          label: cat.name,
        }));
        setCategories(mapped);
      } catch (err) {
        console.error("Lỗi khi fetch categories:", err);
      }
    };

    fetchCategories();

    if (Object.keys(urlFilters).length > 0) {
      setFilters((prev) => ({ ...prev, ...urlFilters }));
    }
  }, [location]);

  // Memoized query params
  const queryParams = useMemo(() => buildQueryParams(filters), [filters]);

  // Fetch tours function
  const fetchTours = useCallback(
    async (customFilters?: FilterState) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = customFilters
          ? buildQueryParams(customFilters)
          : queryParams;
        console.log(params);
        const response = await apiClient.get("/tours/filter", { params });

        if (Array.isArray(response)) {
          setTours(response);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching tours:", err);
        setError("Không thể tải danh sách tour. Vui lòng thử lại sau.");
        setTours([]);
      } finally {
        setIsLoading(false);
      }
    },
    [queryParams]
  );

  // Initial fetch
  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  // Apply filters and update URL
  const applyFilters = useCallback(() => {
    const newQueryParams = buildQueryParams(filters);
    setLocation(`/tours?${newQueryParams.toString()}`);
    fetchTours(filters);
    setFilterOpen(false);
  }, [filters, setLocation, fetchTours]);

  // Quick search handler
  const handleQuickSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (quickSearch.trim()) {
        const newFilters = { ...filters, name: quickSearch.trim() };
        setFilters(newFilters);
        fetchTours(newFilters);
        const newQueryParams = buildQueryParams(newFilters);
        setLocation(`/tours?${newQueryParams.toString()}`);
      }
    },
    [quickSearch, filters, fetchTours, setLocation]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setQuickSearch("");
    fetchTours(DEFAULT_FILTERS);
    setLocation("/tours");
  }, [fetchTours, setLocation]);

  // Sort handler
  const handleSortChange = useCallback(
    (value: string) => {
      const [sortBy, order] = value.split("-");
      const newFilters = {
        ...filters,
        sort_by: sortBy,
        sort_order: order,
      };
      setFilters(newFilters);
      fetchTours(newFilters);
      const newQueryParams = buildQueryParams(newFilters);
      setLocation(`/tours?${newQueryParams.toString()}`);
    },
    [filters, fetchTours, setLocation]
  );

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      const defaultValue = DEFAULT_FILTERS[key as keyof FilterState];
      return value !== defaultValue;
    });
  }, [filters]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-md"
        >
          <Skeleton className="h-52 w-full" />
          <div className="p-5">
            <Skeleton className="h-5 w-16 rounded-full mb-2" />
            <Skeleton className="h-7 w-4/5 mb-2" />
            <Skeleton className="h-4 w-32 mb-3" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Banner with Search */}
        <div
          className="relative h-[300px] md:h-[400px] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://sakos.vn/wp-content/uploads/2024/05/mu-cang-chai2-2.jpeg')",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-6 text-center">
              Khám Phá Những Trải Nghiệm Du Lịch Tuyệt Vời
            </h1>

            {/* Quick Search */}
            <form onSubmit={handleQuickSearch} className="w-full max-w-xl">
              <div className="flex gap-2 items-center bg-white rounded-lg p-1">
                <Input
                  type="text"
                  placeholder="Tìm kiếm tour theo tên..."
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  className="flex-grow border-none focus:ring-0 text-foreground"
                />
                <Button type="submit" size="sm" className="px-4">
                  <Search className="h-4 w-4 mr-2" /> Tìm kiếm
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Filters & Results */}
        <div className="container mx-auto px-4 py-8">
          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterOpen(!filterOpen)}
                className="sm:w-auto"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Bộ Lọc Nâng Cao
                {filterOpen && <X className="h-4 w-4 ml-2" />}
              </Button>

              <div className="flex flex-wrap gap-2">
                <Select
                  value={`${filters.sort_by}-${filters.sort_order}`}
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger className="w-[180px] h-9 text-sm">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Xóa bộ lọc
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {filterOpen && (
            <div className="bg-white rounded-lg border p-6 mb-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Địa điểm chính
                  </label>
                  <Input
                    placeholder="Nhập địa điểm..."
                    value={filters.location}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Start Location Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Điểm xuất phát
                  </label>
                  <Input
                    placeholder="Nhập điểm xuất phát..."
                    value={filters.start_location}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        start_location: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Destination Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Điểm đến
                  </label>
                  <Input
                    placeholder="Nhập điểm đến..."
                    value={filters.destination}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        destination: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Filter className="inline h-4 w-4 mr-1" />
                    Danh mục
                  </label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        category: value === "all" ? "" : value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      {CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Transport Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phương tiện
                  </label>
                  <Select
                    value={filters.transport}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        transport: value === "all" ? "" : value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phương tiện" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả phương tiện</SelectItem>
                      {TRANSPORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Khoảng giá (VND)
                  </label>
                  <Input
                    placeholder="Ví dụ: 1000000-5000000"
                    value={filters.price}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Duration Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Thời gian (ngày)
                  </label>
                  <Input
                    placeholder="Ví dụ: 3-7"
                    value={filters.duration}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Capacity Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Sức chứa tối đa
                  </label>
                  <Input
                    placeholder="Số người tối đa"
                    type="number"
                    value={filters.capacity}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        capacity: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Available Slots Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Số chỗ còn trống (tối thiểu)
                  </label>
                  <Input
                    placeholder="Số chỗ trống"
                    type="number"
                    value={filters.slots_gte}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        slots_gte: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Date Range */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Ngày khởi hành
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      placeholder="Từ ngày"
                      value={filters.start_date}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          start_date: e.target.value,
                        }))
                      }
                    />
                    <Input
                      type="date"
                      placeholder="Đến ngày"
                      value={filters.end_date}
                      min={filters.start_date}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          end_date: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Schedule Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Lịch trình
                  </label>
                  <Input
                    placeholder="Tìm kiếm lịch trình..."
                    value={filters.schedule}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        schedule: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Include Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Bao gồm dịch vụ
                  </label>
                  <Input
                    placeholder="Tìm dịch vụ bao gồm..."
                    value={filters.include}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        include: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Exclude Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Không bao gồm
                  </label>
                  <Input
                    placeholder="Tìm dịch vụ không bao gồm..."
                    value={filters.exclude}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        exclude: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t">
                <Button
                  onClick={applyFilters}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Áp dụng bộ lọc
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Xóa tất cả
                </Button>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Đang tải..." : `Tìm thấy ${tours.length} tour`}
            </p>
          </div>

          {/* Tour Grid */}
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-center py-10">
              <div className="text-red-500 mb-4">{error}</div>
              <Button onClick={() => fetchTours()}>Thử lại</Button>
            </div>
          ) : tours.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">
                Không tìm thấy tour nào
              </h3>
              <p className="text-muted-foreground mb-6">
                Chúng tôi không thể tìm thấy tour nào khớp với tiêu chí tìm kiếm
                của bạn.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Xóa bộ lọc và xem tất cả tour
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour._id} {...tour} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ToursPage;
