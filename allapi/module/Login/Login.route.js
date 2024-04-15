const express = require("express");
const router = express.Router();
const LoginController = require("./Login.controller");

router
.get("/user-login/:personalId/:password", LoginController.getLoginById);
module.exports = router;
