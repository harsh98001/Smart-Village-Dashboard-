const express = require("express");
const {
  getContactMessages,
  createContactMessage
} = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, adminOnly, getContactMessages).post(createContactMessage);

module.exports = router;
