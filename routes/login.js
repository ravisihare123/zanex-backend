var express = require("express");
var router = express.Router();
const login = require("../controller/login");
var basehelper = require("../helpers/basehelper");


router.post('/adminlogin',login.adminlogin);

module.exports=router;