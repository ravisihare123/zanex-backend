var dbConfig = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
const config = require("../nodemon.json");
const bcrypt = require("bcrypt");

async function adminDisplay(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordToString = password.toString();
  const encrpytPassword = bcrypt.compareSync(passwordToString, salt);

  var result = await dbConfig
    .select()
    .where({
      login_email: email,
      login_password: encrpytPassword,
    })
    .from("login");
  if (result.length == 0) {
    // console.log(req.body);
    res.status(200).json({ status: false });
  } else {
    // console.log(result);
    var token = jwt.sign(
      {
        data: "foobar",
      },
      config.secret,
      { expiresIn: "1m" }
    );
    //   console.log(token);
    res.status(200).json({ status: true, token: token, data: result });
  }
}

async function adminLogin(req, res) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const password = req.body.password;
  const passwordToString = password.toString();
  const bcryptPassword = bcrypt.hashSync(passwordToString, salt);
  var result = await dbConfig("login").insert({
    login_email: req.body.email,
    login_password: bcryptPassword,
  });
  if (result) {
    console.log(result);
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
