const tourService = require("../services/tour.service");
const mongoose = require("mongoose");

const getAllTours = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const tours = await tourService.getAllTours();
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
    const newTour = await tourService.createTour(req.body);
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
    const updatedTour = await tourService.updateTour(req.params.id, req.body);
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

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
