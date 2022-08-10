var express = require("express");
var router = express.Router();
var changepassword = require("../controller/changepassword");

router.post("/password",changepassword.ChangePassword)
module.exports  = router;