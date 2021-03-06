const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation");
const User = require("../../src/db/models").User;


router.get("/users/signup", userController.signUp);
router.post("/users/signup", validation.validateUsers, userController.create);
router.get("/users/signin", userController.signInForm);
router.post("/users/signin", validation.validateUsers, userController.signIn);
router.get("/users/signout", userController.signOut);
router.get("/users/upgrade", userController.upgrade);
router.get("/users/collaborations", userController.showCollaborations);
router.post("/users/:id/upgrade", userController.payment);
router.post("/users/:id/downgrade", userController.downgrade);

module.exports = router;
