const Category = require("../models/category.model");
const Tour = require("../models/tour.model");

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
  const images = files.map((file) => file.path);
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

  if (files && files.length > 0) {
    // Lấy đường dẫn ảnh mới
    const images = files.map((file) => file.path);

    // Thay thế ảnh cũ bằng ảnh mới
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
  return await Category.findByIdAndDelete(categoryId);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
