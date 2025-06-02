const Category = require("../models/category.model");
const Tour = require("../models/tour.model");
const cloudinary = require("cloudinary").v2;

// Hàm xóa ảnh trên Cloudinary theo mảng images [{url, public_id}]
const deleteImagesOnCloudinary = async (images) => {
  if (!images || images.length === 0) return;

  const promises = images.map((img) =>
    cloudinary.uploader.destroy(img.public_id)
  );

  await Promise.all(promises);
};

const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) return null;

  const tours = await Tour.find({ category: categoryId });

  return { category, tours };
};

const addCategory = async (files, categoryData) => {
  const name = categoryData.name;
  const slug = name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/[^a-zA-Z0-9-_]/g, "");

  // Upload ảnh lên Cloudinary và lấy url + public_id
  const images = await Promise.all(
    files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "tours/categories",
      });
      return { url: result.secure_url, public_id: result.public_id };
    })
  );

  const newCategory = new Category({
    name,
    slug,
    description: categoryData.description,
    images,
  });
  return await newCategory.save();
};

const updateCategory = async (categoryId, categoryData, files) => {
  let updateData = { ...categoryData };

  const category = await Category.findById(categoryId);
  if (!category) throw new Error("Category not found");

  if (files && files.length > 0) {
    // Xóa ảnh cũ trên Cloudinary
    await deleteImagesOnCloudinary(category.images);

    // Upload ảnh mới lên Cloudinary
    const images = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "tours/categories",
        });
        return { url: result.secure_url, public_id: result.public_id };
      })
    );

    // Cập nhật ảnh mới
    updateData.images = images;
  }

  if (categoryData.name) {
    const slug = categoryData.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "")
      .replace(/-+/g, "-");

    updateData.slug = slug;
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    updateData,
    { new: true }
  );

  const tours = await Tour.find({ category: categoryId });

  return { updatedCategory, tours };
};

const deleteCategory = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) throw new Error("Category not found");

  // Xóa ảnh trên Cloudinary trước
  await deleteImagesOnCloudinary(category.images);

  // Xóa category
  return await Category.findByIdAndDelete(categoryId);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
