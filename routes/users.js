var express = require('express');
var router = express.Router();
const user = require("../controller/user");
const { checkAdminToken } = require('../helpers/basehelper');
const baseHelper = require('../helpers/basehelper');
const multer = require("./multer");

/* GET users listing. */
router.post('/insertUser',baseHelper.checkAdminToken,multer.single("img"), user.insertUser);
router.post('/displayUser',baseHelper.checkAdminToken, user.displayUser);
router.post('/delete', user.updateDelete);

module.exports = router;
