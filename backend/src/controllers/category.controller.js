const categoryService = require("../services/category.service");
const mongoose = require("mongoose");

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addCategory = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const files = req.files;

    const newCategory = await categoryService.addCategory(files, req.body);
    await session.commitTransaction();

    res.status(201).json(newCategory);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const updateCategory = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const files = req.files;

    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      req.body,
      files
    );

    if (!updatedCategory) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Category not found" });
    }

    await session.commitTransaction();
    res.json(updatedCategory);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const deleteCategory = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deleted = await categoryService.deleteCategory(req.params.id);

    if (!deleted) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Category not found" });
    }

    await session.commitTransaction();
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
