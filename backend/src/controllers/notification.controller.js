const notificationService = require("../services/notification.service");

const getNotifications = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const notifications = await notificationService.getAllNotifications();
    await session.commitTransaction();

    res.json(notifications);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const getNotification = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const notification = await notificationService.getNotificationById(
      req.params.id
    );
    if (!notification)
      return res.status(404).json({ error: "Notification not found" });
    await session.commitTransaction();

    res.json(notification);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const createNotification = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const newNotification = await notificationService.createNotification(
      req.body
    );
    await session.commitTransaction();

    res.status(201).json(newNotification);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const updateNotification = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const updatedNotification = await notificationService.updateNotification(
      req.params.id,
      req.body
    );
    if (!updatedNotification)
      return res.status(404).json({ error: "Notification not found" });
    await session.commitTransaction();

    res.json(updatedNotification);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const deleteNotification = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const deleted = await notificationService.deleteNotification(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Notification not found" });
    await session.commitTransaction();

    res.json({ message: "Notification deleted successfully" });
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
};
