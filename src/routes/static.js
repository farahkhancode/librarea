const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

//router handler- router instance
router.get("/", staticController.index);

module.exports = router;
