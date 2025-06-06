import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Calendar, Users, Search } from "lucide-react";

interface SearchFormProps {
  defaultDestination?: string;
  defaultDates?: string;
  defaultTravelers?: string;
  className?: string;
  compact?: boolean;
}

const SearchForm = ({
  defaultDestination = "",
  defaultDates = "",
  defaultTravelers = "2",
  className = "",
  compact = false,
}: SearchFormProps) => {
  const [destination, setDestination] = useState(defaultDestination);
  const [dateRange, setDateRange] = useState(defaultDates);
  const [travelers, setTravelers] = useState(defaultTravelers);
  const [_, setLocation] = useLocation();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    // Build query string for search
    const searchParams = new URLSearchParams();
    if (destination) searchParams.set("destination", destination);
    if (dateRange) searchParams.set("dates", dateRange);
    if (travelers) searchParams.set("travelers", travelers);

    // Navigate to tours page with search params
    setLocation(`/tours?${searchParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex flex-col ${
        compact ? "md:flex-row" : ""
      } gap-4 ${className}`}
    >
      <div className={compact ? "flex-1" : ""}>
        <label
          htmlFor="destination"
          className="block text-sm font-medium text-muted-foreground mb-1"
        >
          Điểm đến
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="destination"
            className="pl-10"
            placeholder="Where do you want to go?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      </div>

      <div className={compact ? "flex-1 md:w-40" : ""}>
        <label
          htmlFor="daterange"
          className="block text-sm font-medium text-muted-foreground mb-1"
        >
          Ngày
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="daterange"
            className="pl-10"
            placeholder="Select dates"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />
        </div>
      </div>
      <div className={compact ? "flex-1 md:w-36" : ""}>
        <label
          htmlFor="travelers"
          className="block text-sm font-medium text-muted-foreground mb-1"
        >
          Du Khách
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
          <Select value={travelers} onValueChange={setTravelers}>
            <SelectTrigger id="travelers" className="pl-10">
              <SelectValue placeholder="Chọn số du khách" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Người Lớn</SelectItem>
              <SelectItem value="2">2 Người Lớn</SelectItem>
              <SelectItem value="3">3 Người Lớn</SelectItem>
              <SelectItem value="4">4 Người Lớn</SelectItem>
              <SelectItem value="5">5 Người Lớn</SelectItem>
              <SelectItem value="6">6+ Người Lớn</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className={compact ? "md:self-end" : ""}>
        <Button
          type="submit"
          className={`w-full ${compact ? "md:mt-6" : "mt-6"}`}
        >
          <Search className="h-4 w-4 mr-2" />
          Tìm kiếm
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
