const express = require("express");
const {
  getOverview,
  getTrends
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/overview", getOverview);
router.get("/trends", getTrends);

module.exports = router;

