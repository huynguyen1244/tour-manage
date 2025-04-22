const notificationService = require('../services/notification.service');

const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getAllNotifications();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNotification = async (req, res) => {
  try {
    const notification = await notificationService.getNotificationById(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createNotification = async (req, res) => {
  try {
    const newNotification = await notificationService.createNotification(req.body);
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateNotification = async (req, res) => {
  try {
    const updatedNotification = await notificationService.updateNotification(req.params.id, req.body);
    if (!updatedNotification) return res.status(404).json({ error: 'Notification not found' });
    res.json(updatedNotification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const deleted = await notificationService.deleteNotification(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Notification not found' });
    res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification
};
