var express = require('express');
var router = express.Router();
const user = require("../controller/user");
const baseHelper = require('../helpers/basehelper');
const multer = require("./multer");

/* GET users listing. */
router.post('/insertUser',multer.single("img"), user.insertUser);
router.post('/displayUser',baseHelper.checkAdminToken, user.displayUser);
router.post('/delete',baseHelper.checkAdminToken, user.updateDelete);

module.exports = router;
