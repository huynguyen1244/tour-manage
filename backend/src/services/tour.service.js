const Tour = require('../models/tour.model');

const getAllTours = async () => {
  return await Tour.find();
};

const getTourById = async (id) => {
  return await Tour.findById(id);
};

const createTour = async (tourData) => {
  const newTour = new Tour(tourData);
  return await newTour.save();
};

const updateTour = async (id, updatedData) => {
  return await Tour.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteTour = async (id) => {
  return await Tour.findByIdAndDelete(id);
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
