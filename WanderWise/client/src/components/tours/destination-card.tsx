import { Link } from "wouter";
import { MapPin, Star } from "lucide-react";

interface DestinationCardProps {
  destination: string;
  country: string;
  image: string;
  tourCount: number;
  rating: number;
}

const DestinationCard = ({
  destination,
  country,
  image,
  tourCount,
  rating,
}: DestinationCardProps) => {
  return (
    <Link href={`/tours?destination=${encodeURIComponent(destination)}`}>
      <div className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer bg-white">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={destination}
            className="w-full h-full object-cover transition transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-xl font-bold text-white font-poppins">
              {destination}
            </h3>
            <p className="text-white text-opacity-90">{country}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div>
              {" "}
              <p className="text-sm text-muted-foreground">
                <MapPin className="inline-block h-3 w-3 mr-1" />
                {tourCount} Tours
              </p>
            </div>
            <div className="flex items-center">
              <div className="text-accent mr-1">
                <Star className="h-4 w-4 fill-current inline-block" />
              </div>
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
