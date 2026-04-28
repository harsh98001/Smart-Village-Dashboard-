const express = require("express");
const { assistantQuery } = require("../controllers/assistantController");

const router = express.Router();

router.post("/query", assistantQuery);

module.exports = router;
