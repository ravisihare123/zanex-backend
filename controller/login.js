var dbConfig = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
const config = require("../nodemon.json");

async function adminlogin(req, res){

    var email = req.body.email;
    var password = req.body.password;
    var result = await dbConfig.select().where({
        login_email:email,
        login_password:password  
    }).from("login")
    if(result.length==0){
        // console.log(req.body);
        res.status(200).json({status: false})
    }
    else{
        // console.log(result);
        var token =jwt.sign({
            data: 'foobar'
          },config.secret , { expiresIn: "1m" });
        //   console.log(token);
        res.status(200).json({status:true,token:token,data:result})
    }

}

const login = {
    adminlogin,
}
module.exports = login;