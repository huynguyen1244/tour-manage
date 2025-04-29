const Category = require('../models/category.model');

const getAllCategories = async () => {
  return await Category.find().populate('tours');
}

const getCategoryById = async (categoryId) => {
  return await Category.findById(categoryId).populate('tours');
}

const addCategory = async (categoryData) => {
  const newCategory = new Category(categoryData);
  return await newCategory.save();
}

const updateCategory = async (categoryId, categoryData) => {
  return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true }).populate('tours');
}

const deleteCategory = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
}   

const addTourToCategory = async (categoryId, tourId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error('Category not found');
  }
    if (!category.tours.includes(tourId)) {
        category.tours.push(tourId);
        return await category.save();
    } 
}

const removeTourFromCategory = async (categoryId, tourId) => {
  const category = await Category.findById(categoryId);
  if (category) {
    category.tours = category.tours.filter(tour => tour.toString() !== tourId.toString());
    return await category.save();
  };
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  addTourToCategory,
  removeTourFromCategory
};