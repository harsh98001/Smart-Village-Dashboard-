const express = require("express");
const {
  getNotifications,
  createNotification,
  deleteNotification
} = require("../controllers/notificationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getNotifications).post(protect, adminOnly, createNotification);
router.delete("/:id", protect, adminOnly, deleteNotification);

module.exports = router;

