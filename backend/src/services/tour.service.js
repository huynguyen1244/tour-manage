const Tour = require("../models/tour.model");
const cloudinary = require("cloudinary").v2;

const getAllTours = async () => {
  return await Tour.find();
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
    // Xóa ảnh cũ
    if (existingTour.images && existingTour.images.length > 0) {
      for (const img of existingTour.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

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

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
