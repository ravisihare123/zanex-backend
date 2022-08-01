const dbConfig = require("../database/dbConfig");
const bcrypt = require("bcrypt");

async function ChangePassword(req, res) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const matchPassword = (req.body.newpassword, req.body.confrimpassword);
  const bcryptPassword = await bcrypt.hash(matchPassword, salt);
  var result = await dbConfig("changepassword").insert({
    change_pass: req.body.changepassword,
    new_pass: bcryptPassword,
    confrim_pass: bcryptPassword,
  });

  if (result) {
    res.status(200).json({ status: true, data: result, message: "success!!!" });
  } else {
    console.log(req.body);
    res.status(500).json({ status: false, data: false, message: " Failed" });
  }
}

const changepassword = {
  ChangePassword,
};

module.exports = changepassword;

// const {newpassword, confrimpassword} = req.body;
// // console.log(req.body);
// if(newpassword == confrimpassword){
//     var result = await dbConfig('changepassword').insert({
//         change_pass:req.body.changepassword,
//         new_pass:newpassword,
//         confrim_pass:confrimpassword
//     })
//     // console.log(result);

//     if(result){
//         res.status(200).json({status:true, data: result,message:"success!!!"})
//     }
//     else{
//         console.log(req.body);
//         res.status(500).json({status:false,data:false,message:" Failed"})
//     }
// }
// else{
//     res.status(200).json({status:false,message:"password doesn't matched!!!"})
// }

// }

// const changepassword ={
// ChangePassword
// }

// if (result) {
//     var result1 = await dbConfig('changepassword').select().where("change_id","=",result)
//     if (result1) {
//         // console.log(result1);
//         res.status(200).json({ status: true, data: result1 })
//     }
// }
