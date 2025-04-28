import { Link } from "wouter";
import { Heart, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tour } from "@shared/schema";
import { cn } from "@/lib/utils";

interface TourCardProps {
  tour: Tour;
  className?: string;
}

const TourCard = ({ tour, className }: TourCardProps) => {
  const {
    id,
    title,
    destination,
    duration,
    price,
    discountedPrice,
    image,
    rating,
    reviewCount,
    featured,
  } = tour;

  const hasDiscount = discountedPrice && discountedPrice < price;

  return (
    <div className={cn("bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition", className)}>
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover"
        />
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-accent text-accent-foreground font-medium px-2 py-1 shadow-sm">
              Bestseller
            </Badge>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Button variant="outline" size="icon" className="bg-white hover:bg-gray-100 h-8 w-8 rounded-full">
            <Heart className="h-4 w-4 text-foreground" />
          </Button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-2">
          <Badge variant="secondary" className="bg-blue-100 text-primary text-xs px-2 py-1 rounded-full">
            {duration} days
          </Badge>
          
          <div className="flex items-center ml-auto">
            <div className="flex items-center text-accent">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm font-medium">{rating?.toFixed(1)}</span>
            </div>
            <span className="ml-1 text-xs text-muted-foreground">
              ({reviewCount})
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold font-poppins text-foreground mb-2">
          {title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{destination}</span>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                ${price}
              </span>
            )}
            <div className="text-lg font-bold text-foreground">
              ${hasDiscount ? discountedPrice : price}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                per person
              </span>
            </div>
          </div>
          
          <Button asChild>
            <Link href={`/tours/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
