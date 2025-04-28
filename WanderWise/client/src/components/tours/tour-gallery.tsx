import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Images } from "lucide-react";

interface TourGalleryProps {
  images: string[];
  title: string;
}

const TourGallery = ({ images, title }: TourGalleryProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { theme } = useTheme();

  if (!images || images.length === 0) {
    return null;
  }

  const openGallery = (index: number = 0) => {
    setCurrentImageIndex(index);
    setDialogOpen(true);
  };

  const mainImage = images[0];
  const galleryImages = images.slice(1);
  
  // Handle case where there are fewer than 4 additional images
  const filledGalleryImages = [...galleryImages];
  if (filledGalleryImages.length < 4) {
    const remaining = 4 - filledGalleryImages.length;
    // Use first images to fill the remaining slots
    for (let i = 0; i < remaining; i++) {
      filledGalleryImages.push(images[i % images.length]);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2 rounded-xl overflow-hidden h-80 md:h-96">
          <img
            src={mainImage}
            alt={`${title} main image`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filledGalleryImages.slice(0, 3).map((image, index) => (
            <div 
              key={index} 
              className="rounded-xl overflow-hidden cursor-pointer"
              onClick={() => openGallery(index + 1)}
            >
              <img
                src={image}
                alt={`${title} gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div 
            className="rounded-xl overflow-hidden relative group cursor-pointer"
            onClick={() => openGallery(0)}
          >
            <img
              src={filledGalleryImages[3]}
              alt={`${title} gallery image 4`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity group-hover:opacity-100">
              <div className="text-white text-center">
                <Images className="h-6 w-6 mx-auto mb-1" />
                <p className="font-medium">See all photos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{title} Gallery</DialogTitle>
          </DialogHeader>
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="flex items-center justify-center p-1">
                    <img
                      src={image}
                      alt={`${title} image ${index + 1}`}
                      className="max-h-[70vh] w-auto object-contain rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Button variant="outline" onClick={() => setDialogOpen(false)} className="mx-auto">
            Close Gallery
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TourGallery;
