const dbConfig = require("../database/dbConfig");

async function insertUser(req, res) {
  const { userid } = req.body;
  if (userid) {
    var result = await dbConfig("user").where("userid", userid).update({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      phone_number: req.body.phonenumber,
      user_image: req.myfilename,
    });
    if (result) {
      res.status(200).json({ status: true, data: result });
    } else {
      console.log("update log");
      res.status(500).json({ status: false, data: false });
    }
  }
  // var result = await dbConfig("user").insert({
  //   first_name: req.body.firstname,
  //   last_name: req.body.lastname,
  //   phone_number: req.body.phonenumber,
  //   user_image: req.myfilename,
  // });
  //  if (result) {
  //    res.status(200).json({ status: true, data: result });
  //  } else {
  //    res.status(500).json({ status: false, data: false });
  //  }

  // console.log(req.myfilename);
  else {
    //   var result = await dbConfig("user").where("userid", userid).update({
    //     first_name: req.body.firstname,
    //     last_name: req.body.lastname,
    //     phone_number: req.body.phonenumber,
    //     user_image: req.myfilename,
    //   });
    //   if (result) {
    //     res.status(200).json({ status: true, data: result });
    //   } else {
    //     console.log("update log");
    //     res.status(500).json({ status: false, data: false });
    //   }
    // }

    var result = await dbConfig("user").insert({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      phone_number: req.body.phonenumber,
      user_image: req.myfilename,
    });
    if (result) {
      res.status(200).json({ status: true, data: result });
    } else {
      res.status(500).json({ status: false, data: false });
    }
  }
}



async function displayUser(req, res) {

  const { perpage, page } = req.body;
  var offset = (page - 1) * [parseInt(perpage)];
  var total = total / parseInt(perpage);
  
  var result = await dbConfig.select().where("is_delete",0).from("user").limit(parseInt(perpage)).offset(offset)
  if (result) {
    res.status(200).json({ status: true,total_page:Math.ceil(total), data: result });
  } else {
    res.status(500).json({ staus: false, data: false });
  }
}

async function updateDelete(req, res) {
  const { userid } = req.body;
  var result = await dbConfig("user").where("userid",userid).update({
    is_delete:1
  })
  if (result) {
    res.json({
      status:true,
      data:result
    })
  }
  else {
    res.json({
      status: false,
      data: false
    })
  }
}

const user = {
  insertUser,
  displayUser,
  updateDelete,
};
module.exports = user;
