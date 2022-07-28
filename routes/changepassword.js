var express = require("express");
var router = express.Router();
var changepassword = require("../controller/changepassword");
const bashelper = require("../helpers/basehelper");

router.post("/password",bashelper,changepassword.ChangePassword)
module.exports  = router;