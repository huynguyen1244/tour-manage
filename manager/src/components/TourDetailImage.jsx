import { useState } from "react";

const TourImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0]?.url || "");

  return (
    <div className="flex gap-4">
      {/* Ảnh to bên trái */}
      <div className="flex-1">
        <img
          src={selectedImage}
          alt="Ảnh tour"
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      {/* Danh sách ảnh nhỏ bên phải */}
      <div className="flex flex-col gap-2 w-28">
        {images?.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(img.url)}
            className={`w-full h-20 object-cover rounded cursor-pointer border-2 ${
              selectedImage === img.url
                ? "border-blue-500"
                : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TourImages;
