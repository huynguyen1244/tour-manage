const categoryService = require("../services/category.service");

const getAllCategories = async (req, res) => {
  const session = await mongoose.startSession();

  try {
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
    const newCategory = await categoryService.addCategory(req.body);
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
    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      req.body
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

const addTourToCategory = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { categoryId, tourId } = req.body;
    const updatedCategory = await categoryService.addTourToCategory(
      categoryId,
      tourId
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

const removeTourFromCategory = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { categoryId, tourId } = req.body;
    const updatedCategory = await categoryService.removeTourFromCategory(
      categoryId,
      tourId
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

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  addTourToCategory,
  removeTourFromCategory,
};
