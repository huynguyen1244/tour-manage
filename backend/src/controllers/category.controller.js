const categoryService = require("../services/category.service");
const mongoose = require("mongoose");

const getAllCategories = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const categories = await categoryService.getAllCategories();
    await session.commitTransaction();

    res.json(categories);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const getCategoryById = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    await session.commitTransaction();

    res.json(category);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const addCategory = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

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

  try {
    session.startTransaction();

    const files = req.files;

    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      req.body,
      files
    );
    if (!updatedCategory)
      return res.status(404).json({ error: "Category not found" });
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

  try {
    session.startTransaction();

    const deleted = await categoryService.deleteCategory(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Category not found" });
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
