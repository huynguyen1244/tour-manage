const tourService = require('../services/tour.service');

const getAllTours = async (req, res) => {
  try {
    const tours = await tourService.getAllTours();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTourById = async (req, res) => {
  try {
    const tour = await tourService.getTourById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await tourService.createTour(req.body);
    res.status(201).json(newTour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTour = async (req, res) => {
  try {
    const updatedTour = await tourService.updateTour(req.params.id, req.body);
    if (!updatedTour) return res.status(404).json({ message: 'Tour not found' });
    res.json(updatedTour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTour = async (req, res) => {
  try {
    const deleted = await tourService.deleteTour(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Tour not found' });
    res.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
