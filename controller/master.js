const dbConfig = require("../database/dbConfig");

// airport 
async function insertEdit_Airport(req, res) {
   try {
     const {  id, name, code, terminal } = req.body;

     const getData = await dbConfig("airport_master").where("id", id).first();

     var data = {
       name: name,
       code: code,
       terminal: terminal,
     };

     if (getData) {
       data.updateAt = new Date();
       data.updateBy = 1;

       await dbConfig("airport_master").where("id", id).update(data);
       await dbConfig("logs").insert({
         event_Id: id,
         event_name: "Airport",
         type: "update",
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

       const checkAdmin = await dbConfig("airport_master")
         .where("code", code)
         .where("isdelete", 0)
         .first();

       if (checkAdmin) {
         return res.json({
           status: false,
           msg: "code No. Already Inserted!!!",
         });
       }

       var insert = await dbConfig("airport_master").insert(data);
       await dbConfig("logs").insert({
         event_Id: insert[0],
         event_name: "Airport",
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
       console.log(id);
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

//aircraftcategory

async function insertEdit_AircraftCategory(req, res) {
  try {
    const {
      id,name,capacity,fual_charge,maintenance_hour,block_seat,
    } = req.body;

     var data = {
       name: name,
       capacity: capacity,
       fual_charge: fual_charge,
       maintenance_hour: maintenance_hour,
       block_seat: block_seat,
       createAt: new Date(),
       createBy: 1,
     };
    var getData = await dbConfig("aircraftcategory_master").where("id", id).first();
    if (getData) {
      data.updateAt = new Date()
      data.updateBy = 1;

      await dbConfig("aircraftcategory_master").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "Aircraft Category",
        type: "UPDATE",
        createAt: new Date(),
        createBy: 1,
      });
      return res.json({
        status: true,
        msg: "update succesfully!"
      })

    }
    else {
      data.createAt = new Date();
      data.createBy = 1;

      const checkAdmin = await dbConfig("aircraftcategory_master")
        .where("name", name)
        .where("isdelete", 0)
        .first();
      if (checkAdmin) {
        return res.json({
          status: false,
          msg :" Already aircraftcategory inserted!!! "
        })
      }
    
      var insert = await dbConfig("aircraftcategory_master").insert(data);
      await dbConfig("logs").insert({
        event_Id: insert[0],
        event_name: "Aircraft Category",
        type: "INSERT",
        createAt: new Date(),
        createBy: 1,
      });
    }
    return res.json({
      st: true,
      msg: "Inserted Successfully!!!",
    });
  }
  catch (err) {
    return res.json({
      status: false,
      msg: err.message
    })
  }
}
async function getAircraftCategory(req, res) {
  try {
    const getList = await dbConfig("aircraftcategory_master")
      .select("id", "name", "capacity", "block_seat")
      .where("isdelete", 0);

    return res.json({
      status: true,
      data: getList,
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
}


async function aircraftcategoryList(req, res) {
  try {
    const getList = await dbConfig("aircraftcategory_master").select(
      "id",
      "name",
      "capacity",
      "fual_charge",
      "maintenance_hour",
      "block_seat"
    ).where("isdelete", 0)
    return res.json({
      status: true,
      data: getList
    })
    

    
  } catch (err) {
    return res.json({
      status: true,
      msg : err.message
    })
  }
}

async function deleteaircraftcategory(req, res) {
  try {
    const {  id } = req.body;

    await dbConfig("aircraftcategory_master").where("id", id).update({ isdelete: 1 });
    await dbConfig("logs").insert({
      event_Id: id,
      event_name: "Aircraft Category",
      type: "DELETE",
      createAt: new Date(),
      createBy: 1,
    });
    return res.json({
      status: true,
      msg: "Deleted Successfully!!!",
    });
    
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message
    })
  }
}

//aircraft

async function insertEditAircraft(req, res) {
  try {
    const { uid, id, name, plane_no, category_id } = req.body;

    const getData = await dbConfig("aircraft_master").where("id", id).first();

    var data = {
      name: name,
      plane_no: plane_no,
      category_id: category_id,
    };

    if (getData) {
      data.updateAt = new Date();
      data.updateBy = 1;

      await dbConfig("aircraft_master").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "Aircraft",
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

      const checkAdmin = await dbConfig("aircraft_master")
        .where("plane_no", plane_no)
        .where("isdelete", 0)
        .first();

      if (checkAdmin) {
        return res.json({
          status: false,
          msg: "Plane No. Already Inserted!!!",
        });
      }

      var insert = await dbConfig("aircraft_master").insert(data);
      await dbConfig("logs").insert({
        event_Id: insert[0],
        event_name: "Aircraft",
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

async function aircraftList(req, res) {
  try {
    const getList = await dbConfig("aircraft_master as a")
      .select(
        "a.id",
        "a.name",
        "a.plane_no",
        "a.category_id",
        "c.name as category_name"
      )
      .leftJoin("aircraftcategory_master as c", "c.id", "=", "a.category_id")
      
      .where("a.isdelete", 0);
    // console.log(getList );
    return res.json({
        status: true,
        data: getList
      })
    
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message
    })
  }
}

async function deleteaircraft(req, res) {
  try {
    const { uid, id } = req.body;

    await dbConfig("aircraft_master").where("id", id).update({ isdelete: 1 });
    await dbConfig("logs").insert({
      event_Id: id,
      event_name: "Aircraft",
      type: "DELETE",
      createAt: new Date(),
      createBy: 1,
    });
    return res.json({
      status: true,
      msg: "Deleted Successfully!!!",
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }

}

// pilot

async function insertEditPilot(req, res) {
  console.log(req.body);
  try {
    const { uid, id, name, mobile, alt_mobile, email, address, licence_no } =
      req.body;

    const licence_doc = req?.files?.licence_doc;
    const gov_doc = req?.files?.gov_doc;

    const fs = require("fs");
    const path = require("path");
    let date = new Date();
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];
    var dirName = day + "-" + month + "-" + year;

    var data = {
      name: name,
      mobile: mobile,
      alt_mobile: alt_mobile,
      email: email,
      address: address,
      licence_no: licence_no,
      
    };

    let dir_path, upload_path;
    if (licence_doc) {
      dir_path = "/licence_doc/" + dirName + "/";
      upload_path = process.cwd() + "/public" + dir_path;
      if (!fs.existsSync(upload_path)) {
        fs.mkdirSync(upload_path, { recursive: true });
      }
      var licence_doc_name = date.getTime() + path.extname(licence_doc.name);
      uploadPath = upload_path + licence_doc_name;
      licence_doc.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
      data.licence_doc = dir_path + licence_doc_name;
    }

    if (gov_doc) {
      dir_path = "/gov_doc/" + dirName + "/";
      upload_path = process.cwd() + "/public" + dir_path;
      if (!fs.existsSync(upload_path)) {
        fs.mkdirSync(upload_path, { recursive: true });
      }
      var gov_doc_name = date.getTime() + path.extname(gov_doc.name);
      uploadPath = upload_path + gov_doc_name;
      gov_doc.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
      data.gov_doc = dir_path + gov_doc_name;
    }

    const getData = await dbConfig("pilot_master").where("id", id).first();

    if (getData) {
      data.updateAt = new Date();
      data.updateBy = 1;

      await dbConfig("pilot_master").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "Pilot",
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

      var insert = await dbConfig("pilot_master").insert(data);
      await dbConfig("logs").insert({
        event_Id: insert[0],
        event_name: "Pilot",
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

async function deletePilot(req, res){
  try {
    const { id } = req.body;
     await dbConfig("pilot_master").where("id", id).update({ isdelete: 1 });
     await dbConfig("logs").insert({
       event_Id: id,
       event_name: "Pilot",
       type: "DELETE",
       createAt: new Date(),
       createBy: uid,
     });
     return res.json({
       st: true,
       msg: "Deleted Successfully!!!",
     });
  
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message
    })
}
}


async function pilotList(req, res) {
  try {

    const getList = await dbConfig("pilot_master").select(
      "id",
      "name",
      "mobile",
      "alt_mobile",
      "email",
      "address",
      "licence_no",
      "licence_doc",
      "gov_doc"
    ).where("isdelete", 0)
    return res.json({
      status: true,
      data: getList
    })
  } catch (err) {
    return res.json({
      status: true,
    msg: err.message})
  }
}

// pax
async function insertEditPax(req, res) {
  try {
    const { uid, id, type, code, age_group, description } = req.body;

    const getData = await dbConfig("pax_master").where("id", id).first();

    var data = {
      type: type,
      code: code,
      age_group: age_group,
      description: description,
    };

    if (getData) {
      data.updateAt = new Date();
      data.updateBy = 1;

      await dbConfig("pax_master").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "Pax",
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

      const checkAdmin = await dbConfig("pax_master")
        .where("type", type)
        .where("isdelete", 0)
        .first();

      if (checkAdmin) {
        return res.json({
          status: false,
          msg: "code No. Already Inserted!!!",
        });
      }

      var insert = await dbConfig("pax_master").insert(data);
      await dbConfig("logs").insert({
        event_Id: insert[0],
        event_name: "Pax",
        type: "INSERT",
        createAt: new Date(),
        createBy: 1,
      });
      return res.json({
        status: true,
        msg: "Inserted Successfully!!!",
      });
    }
  }
  catch (err) {
    return res.json({
      status: false,
      msg: err.message
    })
  }
}

const master = {
  insertEdit_Airport,
  airportList,
  deleteAirport,
  insertEdit_AircraftCategory,
  aircraftcategoryList,
  deleteaircraftcategory,
  getAircraftCategory,
  insertEditAircraft,
  aircraftList,
  deleteaircraft,
  insertEditPilot,
  pilotList,
  deletePilot,
 insertEditPax
};
module.exports = master;
