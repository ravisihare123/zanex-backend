var express = require("express");
var router = express.Router();
const admin = require("../controller/admin");
var basehelper = require("../helpers/basehelper");

// router.post("/admindisplay", login.adminDisplay);
// router.post("/adminlogin", login.adminLogin);

router.post('/adminlogin', admin.adminlogin);
router.post("/inserteditadmin", admin.insertEditAdmin);

module.exports = router;
