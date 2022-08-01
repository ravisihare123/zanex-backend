var express = require("express");
var router = express.Router();
const login = require("../controller/login");
var basehelper = require("../helpers/basehelper");

router.post("/admindisplay", login.adminDisplay);
router.post("/adminlogin", login.adminLogin);

module.exports = router;
