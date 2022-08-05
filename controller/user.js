const dbConfig = require("../database/dbConfig");

async function insertUser(req, res) {
  var result = await dbConfig("user").insert({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    phone_number: req.body.phonenumber,
    user_image: req.myfilename,
  });

  console.log(req.myfilename)
    if (result) {
      res.status(200).json({status: true, data: result})
    }
    else {
        res.status(500).json({status: false, data: false})
    }
}

async function displayUser(req, res) {

  const { perpage, page } = req.body;
  var offset = (page - 1) * [parseInt(perpage)];
  var total = total / parseInt(perpage);
  
  var result = await dbConfig.select().from("user").limit(parseInt(perpage)).offset(offset)
  if (result) {
    res.status(200).json({ status: true,total_page:Math.ceil(total), data: result });
  } else {
    res.status(500).json({ staus: false, data: false });
  }
}

const user = {
  insertUser,
  displayUser,
};
module.exports = user;
