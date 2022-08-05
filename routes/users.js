var express = require('express');
var router = express.Router();
const user = require("../controller/user");
const multer = require("./multer");

/* GET users listing. */
router.post('/insertUser',multer.single("img"), user.insertUser);
router.post('/displayUser', user.displayUser);

module.exports = router;
