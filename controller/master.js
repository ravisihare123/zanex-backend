const dbConfig = require("../database/dbConfig");


async function insertEdit_Airport(req, res) {
    try {
        const { id, name, code, terminal } = req.body;

        var data = {
            name: name,
            code: code, 
            terminal: terminal,
            createAt: new Date(),
            createBy:1
        }


        var insert_airport = await dbConfig("airport_master").insert(data);
        await dbConfig("logs").insert({
            event_Id: insert_airport[0],
            event_name: "airport master",
            type: "insert",
            createAt: new Date(),
            createBy: 1 
        })
        return res.json({
            status: true,
            msg: "insert successfully!!"
         })

  } catch (err) {
    return {
      status: false,
      msg: err.message,
    };
  }
}

async function airportList  (req, res)  {
    try {
        const getList = await dbConfig("airport_master").select("id", "name", "code", "terminal").where("isdelete", 0)
        return res.json({
            status: true,
            data: getList
        })
    } catch (err) {
        return res.json({
            status: false,
            msg:err.message
        })
    }
}

async function deleteAirport(req, res) {
     try {
       const {  id } = req.body;

       await dbConfig("airport_master").where("id", id).update({ isdelete: 1 });
       await dbConfig("logs").insert({
         event_Id: id,
         event_name: "Airport",
         type: "DELETE",
         createAt: new Date(),
         createBy: 1,
       });
       return res.json({
         st: true,
         msg: "Deleted Successfully!!!",
       });
     } catch (err) {
       return res.json({
         st: false,
         msg: err.message,
       });
     }
}

const master = {
    insertEdit_Airport,
    airportList,
    deleteAirport,
};
module.exports = master;
