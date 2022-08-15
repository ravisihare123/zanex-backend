var dbConfig = require("../database/dbConfig");
const {sign} = require("jsonwebtoken");
const config = require("../nodemon.json");
const { compareSync, genSaltSync, hashSync } = require("bcrypt");

async function adminlogin(req, res) {
  try {
    const { username, password } = req.body;

    // console.log(username, password);
    const getAdmin = await dbConfig("admin")
      .where(function () {
        this.where("email", username).orWhere("mobile", username);
      })
      .where("isdelete", 0)
      .first();
    // console.log(username, password);
    if (getAdmin) {
      if (getAdmin.isblock) {
        return res.json({
          st: false,
          msg: "Account Blocked!!!",
        });
      }
      const result = compareSync(password, getAdmin.password);
      if (result) {
        const jwtSecretKey = config.secret;
        const token = sign(
          { id: getAdmin.id, name: getAdmin.name },
          jwtSecretKey,
          { expiresIn: "1d" }
        );
        return res.json({
          status: true,
          msg: "Login Successfully!!!",
          token: token,
        });
      } else {
        return res.json({
          status: false,
          msg: "Password are Wrong!!!",
        });
      }
    } else {
      return res.json({
        status: false,
        msg: "Email or Mobile No. are Wrong!!!",
      });
    }
  } catch (err) {
    return res.json({
      st: false,
      msg: err.message,
    });
  }
}

async function insertEditAdmin(req, res) {
   try {
    const { uid, id,  name, email, mobile, password } = req.body;

    const getAdmin = await dbConfig("admin").where("id", id).first();

    let hash = "";
    if (password !== "") {
      const salt = genSaltSync(10);
      hash = hashSync(password, salt);
    } else {
      if (getAdmin?.password) {
        hash = getAdmin?.password;
      }
    }

    var data = {
      name: name,
      email: email,
      mobile: mobile,
      password: hash,
    };

    if (getAdmin) {
      data.updateAt = new Date();
      data.updateBy = 1;

      await dbConfig("admin").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "Admin",
        type: "UPDATE",
        createAt: new Date(),
        createBy: 1,
      });
      return res.json({
        status: true,
        msg: "Updated Successfully!!!",
      });
    } else {
      data.createAt = new Date();
      data.createBy = 1;

      const checkAdmin = await dbConfig("admin")
        .where(function () {
          this.where("email", email).orWhere("mobile", password);
        })
        .where("isdelete", 0)
        .first();

      if (checkAdmin) {
        return res.json({
          status: false,
          msg: "Email or Mobile No. Already Registered!!!",
        });
      }

      var insert = await dbConfig("admin").insert(data);
      await dbConfig("logs").insert({
        event_Id: insert[0],
        event_name: "Admin",
        type: "INSERT",
        createAt: new Date(),
        createBy: 1,
      });
      return res.json({
        status: true,
        msg: "Inserted Successfully!!!",
      });
    }
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
}


const admin = {
  insertEditAdmin,
  adminlogin
};
module.exports = admin;
