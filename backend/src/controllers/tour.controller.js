const tourService = require("../services/tour.service");
const mongoose = require("mongoose");

const getAllTours = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const filter = req.body;
    const tours = await tourService.getAllTours(filter);
    await session.commitTransaction();
    res.json(tours);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

const getFilter = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const filter = req.query;
    const tours = await tourService.getAllTours(filter);
    await session.commitTransaction();
    res.json(tours);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

const getTourById = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const tour = await tourService.getTourById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    await session.commitTransaction();

    res.json(tour);
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

const createTour = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const files = req.files;
    const newTour = await tourService.createTour(req.body, files);
    await session.commitTransaction();

    res.status(201).json(newTour);
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

const updateTour = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const files = req.files;
    const updatedTour = await tourService.updateTour(
      req.params.id,
      req.body,
      files
    );
    if (!updatedTour)
      return res.status(404).json({ message: "Tour not found" });
    await session.commitTransaction();

    res.json(updatedTour);
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

const deleteTour = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleted = await tourService.deleteTour(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tour not found" });
    await session.commitTransaction();

    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

const deleteTourImage = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleted = await tourService.deleteTourImage(
      req.body.tour_id,
      req.body.image_id
    );
    if (!deleted) return res.status(404).json({ message: "Tour not found" });
    await session.commitTransaction();

    res.json({ message: "Tour image deleted successfully" });
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getAllTours,
  getFilter,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  deleteTourImage,
};
