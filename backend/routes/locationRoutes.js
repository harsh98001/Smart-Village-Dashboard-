const express = require("express");
const {
  getLocationCatalog,
  searchLocations
} = require("../controllers/locationController");

const router = express.Router();

router.get("/catalog", getLocationCatalog);
router.get("/search", searchLocations);

module.exports = router;
