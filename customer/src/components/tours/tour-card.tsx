import { Link } from "wouter";
import {
  Heart,
  Star,
  MapPin,
  Calendar,
  Users,
  Clock,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TourCard = (tour: any) => {
  console.log(tour);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
      case "sẵn sàng":
        return "bg-green-100 text-green-700";
      case "full":
      case "hết chỗ":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        {tour?.images?.length > 0 && (
          <img
            src={tour.images[0].url}
            alt={tour.name}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Heart button */}
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white border-0 h-9 w-9 rounded-full shadow-md"
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
          </Button>
        </div>

        {/* Rating (if available) */}
        {tour.rating && (
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-md">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="ml-1 text-xs font-medium text-gray-700">
                {tour.rating}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Schedule badge */}
        {tour.schedule && (
          <div className="mb-3">
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-3 py-1 rounded-full font-medium"
            >
              {tour.schedule}
            </Badge>
          </div>
        )}

        {/* Tour name */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {tour.name}
        </h3>

        {/* Tour details */}
        <div className="space-y-2 mb-4">
          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
            <span className="text-sm line-clamp-1">{tour.location}</span>
          </div>
          {/* Date range */}
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
            <span className="text-sm">
              {formatDate(tour.start_date)} - {formatDate(tour.end_date)}
            </span>
          </div>
          {/* Available slots */}
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
            <span className="text-sm">Số người tối đa: {tour.capacity} </span>
          </div>

          {/* Available slots */}
          <div className="flex items-center text-gray-600">
            <Ticket className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
            <span className="text-sm">Còn {tour.available_slots} slot</span>
          </div>

          {/* Duration (if available) */}
          {tour.duration && (
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
              <span className="text-sm">{tour.duration}</span>
            </div>
          )}
        </div>

        {/* Status badge */}
        <div className="mb-4">
          <Badge
            className={`${getStatusVariant(
              tour.status
            )} text-xs px-3 py-1 rounded-full font-medium border-0`}
          >
            {tour.status}
          </Badge>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          {/* Price (if available) */}
          {tour.price && (
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">
                {tour.price.toLocaleString("vi-VN")}₫
              </span>
            </div>
          )}

          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Link href={`/tours/${tour._id || tour.id}`}>Xem Chi Tiết</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
