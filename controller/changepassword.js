const dbConfig = require("../database/dbConfig");

async function ChangePassword(req, res){

    const{newpassword, confrimpassword} = req.body;

    if(newpassword == confrimpassword){
        var result = await dbConfig('changepassword').insert({
            change_pass:req.body.changepassword,
            new_pass:newpassword,
            confrim_pass:confrimpassword
        })
        if(result){
            res.status(200).json({status:true, data: result,message:"success!!!"})
        }
        else{
            console.log(req.body);
            res.status(500).json({status:false,data:false,message:" Failed"})
        }
    }
    else{
        res.status(200).json({status:false,message:"password dont matched!!!"})
    }
 

    
  
}

const changepassword ={
    ChangePassword
}

module.exports = changepassword;



// if (result) {
//     var result1 = await dbConfig('changepassword').select().where("change_id","=",result)
//     if (result1) {
//         // console.log(result1);
//         res.status(200).json({ status: true, data: result1 })
//     }
// }