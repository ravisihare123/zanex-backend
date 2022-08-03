var dbConfig = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
const config = require("../nodemon.json");
const bcrypt = require("bcrypt");

async function adminDisplay(req, res) {
  // console.log(req.body)
  var email = req.body.email;
  var password = req.body.password;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  // const strings = undefined;
  const passwordToString = password.toString();
  const encrpytPassword = bcrypt.compareSync(passwordToString, salt);

// console.log({email,passwordToString, encrpytPassword})

  var result = await dbConfig
    .select()
    .where({
      login_email: email,
      login_password: encrpytPassword,
    })
    .from("login");
  console.log(result);
  if (result.length == 0) {
    // console.log(req.body);
    res.status(200).json({ status: false });
  } else {
    // console.log(result);
    var token = jwt.sign(
      {email:result.login_email,name:result.login_name},
      config.secret,
      { expiresIn: "1m" }
    );
    //   console.log(token);
    res.status(200).json({ status: true, token: token, data: result });
  }
}

async function adminLogin(req, res) {

  console.log(req.body)
  const password = req.body.password;
 
  
  var salt =  bcrypt.genSaltSync(10);
  console.log(password, salt)
  var hash =  bcrypt.hashSync(password, salt);

  var result = await dbConfig("login").insert({
    login_email: req.body.email,
    login_password: hash,
  });
  if (result) {
    // console.log(result);
    res.status(200).json({ status: true, data: result });
  } else {
    console.log(req.body);
    res.status(500).json({ status: false, data: false });
  }
}

const login = {
  adminDisplay,
  adminLogin,
};
module.exports = login;
