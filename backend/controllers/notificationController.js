const Notification = require("../models/Notification");

const getNotifications = async (_req, res, next) => {
  try {
    const notifications = await Notification.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications
    });
  } catch (error) {
    next(error);
  }
};

const createNotification = async (req, res, next) => {
  try {
    const notification = await Notification.create({
      ...req.body,
      createdBy: req.user._id
    });

    const populated = await notification.populate("createdBy", "name role");

    res.status(201).json({
      success: true,
      message: "Notification published successfully",
      notification: populated
    });
  } catch (error) {
    next(error);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      res.status(404);
      throw new Error("Notification not found");
    }

    await notification.deleteOne();

    res.json({
      success: true,
      message: "Notification deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  createNotification,
  deleteNotification
};

