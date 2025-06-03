const Tour = require("../models/tour.model");
const cloudinary = require("cloudinary").v2;

const getAllTours = async (filter) => {
  let query = {};
  if (filter.name) {
    query.name = { $regex: filter.name, $options: "i" }; // tìm theo tên, không phân biệt hoa thường
  }
  if (filter.location) {
    query.location = { $regex: filter.location, $options: "i" };
  }
  if (filter.price) {
    const priceRange = filter.price.split("-");
    if (priceRange.length === 2) {
      const minPrice = parseFloat(priceRange[0]);
      const maxPrice = parseFloat(priceRange[1]);
      query.price = { $gte: minPrice, $lte: maxPrice };
    }
  }
  if (filter.duration) {
    const durationRange = filter.duration.split("-");
    if (durationRange.length === 2) {
      const minDuration = parseInt(durationRange[0]);
      const maxDuration = parseInt(durationRange[1]);
      query.duration = { $gte: minDuration, $lte: maxDuration };
    }
  }
  if (filter.rating) {
    const rating = parseFloat(filter.rating);
    query.rating = { $gte: rating };
  }
  if (filter.is_active) {
    query.is_active = filter.is_active === "true";
  }
  if (filter.is_featured) {
    query.is_featured = filter.is_featured === "true";
  }
  if (filter.start_date) {
    const startDate = new Date(filter.start_date);
    query.start_date = { $gte: startDate };
  }
  if (filter.end_date) {
    const endDate = new Date(filter.end_date);
    query.end_date = { $lte: endDate };
  }
  if (filter.category) {
    query.category = { $regex: filter.category, $options: "i" };
  }
  if (filter.sort_by) {
    const sortField = filter.sort_by;
    const sortOrder = filter.sort_order === "desc" ? -1 : 1;
    return await Tour.find(query).sort({ [sortField]: sortOrder });
  }
  return await Tour.find(query).sort({ createdAt: -1 });
};

const getTourById = async (id) => {
  return await Tour.findById(id);
};

const createTour = async (tourData, files) => {
  const images = await Promise.all(
    files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "tours/images",
      });
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    })
  );

  const newTour = new Tour({ ...tourData, images });
  return await newTour.save();
};

const updateTour = async (id, updatedData, files) => {
  const existingTour = await Tour.findById(id);
  if (!existingTour) return null;

  // Nếu có ảnh mới thì xóa ảnh cũ trên Cloudinary
  if (files && files.length > 0) {
    // // Xóa ảnh cũ
    // if (existingTour.images && existingTour.images.length > 0) {
    //   for (const img of existingTour.images) {
    //     if (img.public_id) {
    //       await cloudinary.uploader.destroy(img.public_id);
    //     }
    //   }
    // }

    // Upload ảnh mới
    const images = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "tours/images",
        });
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
    );

    updatedData.images = images;
  }

  return await Tour.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteTour = async (id) => {
  const tour = await Tour.findById(id);
  if (!tour) return null;

  // Xóa ảnh trên Cloudinary
  if (tour.images && tour.images.length > 0) {
    for (const img of tour.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }
  }

  return await Tour.findByIdAndDelete(id);
};

const deleteTourImage = async (tour_id, image_id) => {
  const tour = await Tour.findById(tour_id);
  if (!tour) return null;
  const imageIndex = tour.images.findIndex(
    (img) => img._id.toString() === image_id
  );
  if (imageIndex === -1) return null;
  const image = tour.images[imageIndex];
  if (image.public_id) {
    await cloudinary.uploader.destroy(image.public_id);
  }
  tour.images.splice(imageIndex, 1);
  return await tour.save();
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  deleteTourImage,
};
