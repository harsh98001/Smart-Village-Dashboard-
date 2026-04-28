const express = require("express");
const {
  getVillages,
  getVillageById,
  createVillage,
  updateVillage,
  deleteVillage
} = require("../controllers/villageController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getVillages).post(protect, adminOnly, createVillage);
router
  .route("/:id")
  .get(getVillageById)
  .put(protect, adminOnly, updateVillage)
  .delete(protect, adminOnly, deleteVillage);

module.exports = router;

