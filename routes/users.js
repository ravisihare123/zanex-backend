var express = require('express');
var router = express.Router();
const user = require("../controller/user");

/* GET users listing. */
router.post('/insertUser',user.insertUser);

module.exports = router;
