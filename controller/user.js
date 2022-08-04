const dbConfig = require("../database/dbConfig");

async function insertUser(req, res) {
  var result = await dbConfig("user").insert({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    phone_number: req.body.phonenumber,
    user_image: req.body.img,
  });

    if (result) {
      res.status(200).json({status: true, data: result})
    }
    else {
        res.status(500).json({status: false, data: false})
    }
}

const user = {
  insertUser,
};
module.exports = user;
