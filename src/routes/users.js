const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation");
const User = require("../../src/db/models").User;


router.get("/users/signup", userController.signUp);
router.post("/users/signup", validation.validateUsers, userController.create);

module.exports = router;
