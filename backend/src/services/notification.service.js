const Notification = require('../models/notification.model');

const getAllNotifications = async () => {
  return await Notification.find().populate('user_id');
};

const getNotificationById = async (id) => {
  return await Notification.findById(id).populate('user_id');
};

const createNotification = async (notificationData) => {
  const newNotification = new Notification(notificationData);
  return await newNotification.save();
};

const updateNotification = async (id, updateData) => {
  return await Notification.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteNotification = async (id) => {
  return await Notification.findByIdAndDelete(id);
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
};
