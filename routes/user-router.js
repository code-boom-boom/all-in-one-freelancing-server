const express = require('express');

const UserController = require('../controllers/user-controller');

const router = express.Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);

module.exports = router;