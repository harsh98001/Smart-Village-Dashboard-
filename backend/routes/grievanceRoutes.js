const express = require("express");
const {
  getGrievances,
  createGrievance
} = require("../controllers/grievanceController");

const router = express.Router();

router.route("/").get(getGrievances).post(createGrievance);

module.exports = router;
