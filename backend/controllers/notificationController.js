const Notification = require("../models/Notification");
const { writeAuditLog } = require("../utils/auditLogger");

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

    await writeAuditLog({
      action: "notification_created",
      actor: req.user,
      targetType: "Notification",
      targetId: notification._id,
      details: {
        title: notification.title,
        type: notification.type,
        priority: notification.priority,
        audience: notification.audience
      }
    });

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

    const auditDetails = {
      title: notification.title,
      type: notification.type,
      priority: notification.priority,
      audience: notification.audience
    };

    await notification.deleteOne();

    await writeAuditLog({
      action: "notification_deleted",
      actor: req.user,
      targetType: "Notification",
      targetId: req.params.id,
      details: auditDetails
    });

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
