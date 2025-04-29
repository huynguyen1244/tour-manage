const categoryService = require('../services/category.service');

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const addCategory = async (req, res) => {
  try {
    const newCategory = await categoryService.addCategory(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
    if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const deleteCategory = async (req, res) => {
  try {
    const deleted = await categoryService.deleteCategory(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const addTourToCategory = async (req, res) => {
  try {
    const { categoryId, tourId } = req.body;
    const updatedCategory = await categoryService.addTourToCategory(categoryId, tourId);
    if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const removeTourFromCategory = async (req, res) => {
  try {
    const { categoryId, tourId } = req.body;
    const updatedCategory = await categoryService.removeTourFromCategory(categoryId, tourId);
    if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });
    res.json(updatedCategory);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
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