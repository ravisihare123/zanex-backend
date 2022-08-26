const dbConfig = require("../database/dbConfig");

// airport
async function insertEdit_Airport(req, res) {
  try {
    const { uid, id, name, code, terminal } = req.body;

    const getData = await dbConfig("airport_master").where("id", id).first();

    var data = {
      name: name,
      code: code,
      terminal: terminal,
    };

    if (getData) {
      data.updateAt = new Date();
      data.updateBy = uid;

      await dbConfig("airport_master").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "Airport",
        type: "update",
        createAt: new Date(),
        createBy: uid,
      });
      return res.json({
        status: true,
        msg: "Updated Successfully!!!",
      });
    } else {
      data.createAt = new Date();
      data.createBy = uid;

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
        createBy: uid,
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

async function airportList(req, res) {
  const { uid } = req.body;
  try {
    const getList = await dbConfig("airport_master")
      .select("id", "name", "code", "terminal")
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

async function deleteAirport(req, res) {
  try {
    const { uid, id } = req.body;

    await dbConfig("airport_master").where("id", id).update({ isdelete: 1 });
    console.log(id);
    await dbConfig("logs").insert({
      event_Id: id,
      event_name: "Airport",
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
      st: false,
      msg: err.message,
    });
  }
}

//aircraftcategory

async function insertEdit_AircraftCategory(req, res) {
  try {
    const {
      uid,
      id,
      name,
      capacity,
      fual_charge,
      maintenance_hour,
      block_seat,
    } = req.body;

    var data = {
      name: name,
      capacity: capacity,
      fual_charge: fual_charge,
      maintenance_hour: maintenance_hour,
      block_seat: block_seat,
      createAt: new Date(),
      createBy: uid,
    };
    var getData = await dbConfig("aircraftcategory_master")
      .where("id", id)
      .first();
    if (getData) {
      data.updateAt = new Date();
      data.updateBy = uid;

      await dbConfig("aircraftcategory_master").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "Aircraft Category",
        type: "UPDATE",
        createAt: new Date(),
        createBy: uid,
      });
      return res.json({
        status: true,
        msg: "update succesfully!",
      });
    } else {
      data.createAt = new Date();
      data.createBy = uid;

      const checkAdmin = await dbConfig("aircraftcategory_master")
        .where("name", name)
        .where("isdelete", 0)
        .first();
      if (checkAdmin) {
        return res.json({
          status: false,
          msg: " Already aircraftcategory inserted!!! ",
        });
      }

      var insert = await dbConfig("aircraftcategory_master").insert(data);
      await dbConfig("logs").insert({
        event_Id: insert[0],
        event_name: "Aircraft Category",
        type: "INSERT",
        createAt: new Date(),
        createBy: uid,
      });
    }
    return res.json({
      st: true,
      msg: "Inserted Successfully!!!",
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
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
    const getList = await dbConfig("aircraftcategory_master")
      .select(
        "id",
        "name",
        "capacity",
        "fual_charge",
        "maintenance_hour",
        "block_seat"
      )
      .where("isdelete", 0);
    return res.json({
      status: true,
      data: getList,
    });
  } catch (err) {
    return res.json({
      status: true,
      msg: err.message,
    });
  }
}

async function deleteaircraftcategory(req, res) {
  try {
    const { uid, id } = req.body;

    await dbConfig("aircraftcategory_master")
      .where("id", id)
      .update({ isdelete: 1 });
    await dbConfig("logs").insert({
      event_Id: id,
      event_name: "Aircraft Category",
      type: "DELETE",
      createAt: new Date(),
      createBy: uid,
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
      data.updateBy = uid;

      await dbConfig("aircraft_master").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "Aircraft",
        type: "UPDATE",
        createAt: new Date(),
        createBy: uid,
      });
      return res.json({
        status: true,
        msg: "Updated Successfully!!!",
      });
    } else {
      data.createAt = new Date();
      data.createBy = uid;

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
        createBy: uid,
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
      data: getList,
    });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
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
      createBy: uid,
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
  try {
    const { uid, id, name, mobile, alt_mobile, email, address, licence_no } =
      req.body;

    
    var data = {
      name: name,
      mobile: mobile,
      alt_mobile: alt_mobile,
      email: email,
      address: address,
      licence_no: licence_no,
      licence_doc: req.licence_doc,
      gov_doc: req.gov_doc,
    };

    const getData = await dbConfig("pilot_master").where("id", id).first();

    if (getData) {
      data.updateAt = new Date();
      data.updateBy = uid;

      await dbConfig("pilot_master").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "Pilot",
        type: "UPDATE",
        createAt: new Date(),
        createBy: uid,
      });
      return res.json({
        status: true,
        msg: "Updated Successfully!!!",
      });
    } else {
      data.createAt = new Date();
      data.createBy = uid;

      var insert = await dbConfig("pilot_master").insert(data);
      await dbConfig("logs").insert({
        event_Id: insert[0],
        event_name: "Pilot",
        type: "INSERT",
        createAt: new Date(),
        createBy: uid,
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

async function deletePilot(req, res) {
  try {
    const { uid, id } = req.body;
    await dbConfig("pilot_master").where("id", id).update({ isdelete: 1 });
    await dbConfig("logs").insert({
      event_Id: id,
      event_name: "Pilot",
      type: "DELETE",
      createAt: new Date(),
      createBy: uid,
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

async function pilotList(req, res) {
  try {
    const getList = await dbConfig("pilot_master")
      .select(
        "id",
        "name",
        "mobile",
        "alt_mobile",
        "email",
        "address",
        "licence_no",
        "licence_doc",
        "gov_doc"
      )
      .where("isdelete", 0);
    return res.json({
      status: true,
      data: getList,
    });
  } catch (err) {
    return res.json({
      status: true,
      msg: err.message,
    });
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
      data.updateBy = uid;

      await dbConfig("pax_master").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "Pax",
        type: "UPDATE",
        createAt: new Date(),
        createBy: uid,
      });
      return res.json({
        status: true,
        msg: "Updated Successfully!!!",
      });
    } else {
      data.createAt = new Date();
      data.createBy = uid;

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
        createBy: uid,
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

async function paxList(req, res) {
  const { search_item } = req.body;
  try {

    // var searchs = await dbConfig("pax_master").where("code","like","%"+search_item+"%").first()
    var getlist = await dbConfig("pax_master").select("id", "type", "code", "age_group", "description")
      .where(function () {
        this.where("code","like","%",+search_item+"%")
      })
      .where("isdelete", 0)
    return res.json({
      status: true,
      data: getlist
    })
    
  } catch (err) {
    return res.json({
      status: false,
      msg:err.message
    })
  }
}
async function deletePax(req, res) {
  try {
    const { uid, id } = req.body;

    await dbConfig("pax_master").where("id", id).update({ isdelete: 1 });
    await dbConfig("logs").insert({
      event_Id: id,
      event_name: "Pax",
      type: "DELETE",
      createAt: new Date(),
      createBy: uid,
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

// farGrade
async function insertEditFareGrade(req, res) {
  try {
    const { uid, id, grade_name, detail } = req.body; 
    var data = {
      grade_name: grade_name,
      detail: JSON.stringify(detail)
    }
    const getData = await dbConfig("faregrade_master").where("id", id).first();
    
    if (getData) {
      data.updateAt = new Date();
      data.updateBy = uid

      await dbConfig("faregrade_master").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "FareGrade",
        type: " UPDATE",
        createAt: new Date(),
        createBy: uid
      });
      return res.json({
        status: true,
        msg: "Updated Successfully!!"
      });
    } else {
data.createAt = new Date();
       data.createBy = uid;
      const CheckGrade = await dbConfig("faregrade_master").where("grade_name", grade_name)
        .andWhere("isdelete", 0).first();
      if (CheckGrade) {
        return res.json({
          status: false,
          msg: "Data Already Inserted!!!"
        });
      }

       
       var insert = await dbConfig("faregrade_master").insert(data);
       await dbConfig("logs").insert({
         event_Id: insert[0],
         event_name: "FareGrade",
         type: "INSERT",
         createAt: new Date(),
         createBy: uid,
       });
       return res.json({
         status: true,
         msg: "Inserted Successflly!!",
       });
    }

   
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message
    })
  }
}

async function getPax(req, res) {
  try {
    var result = await dbConfig("pax_master").select("id", "type", "code").where("isdelete", 0);

    var arr = [];
    for (var i in result) {
      arr.push({
        value: result[i].id,
        label: result[i].type,
        code: result[i].code
      })
    }
    return res.json({
      status: true,
      data: arr
    })
    
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message
    })
  }
}

async function fareGradeList(req, res) {
  try {
    
    var result = await dbConfig("faregrade_master").select("id", "grade_name", "detail").where("isdelete", 0)
    return res.json({
      status: true,
      data:result
      });
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message
    })
  }
}

async function deleteFareGrade(req, res) {
  try {
    const { uid, id } = req.body;
    await dbConfig("faregrade_master").where("id", id).update({ isdelete: 1 });
    await dbConfig("logs").insert({
      event_Id: id,
      event_name: "FareGrade",
      type: "DELETE",
      createAt: new Date(),
      createBy: uid,
    });
    return res.json({
      status: true,
      msg: "Deleted Successfully!!!",
    });
    
  } catch (err) {
    return res.json({
      status: false,
      msg:err.message,
    })
  }
}


/// chargeTable
async function InsertEditChargeTable(req, res) {
  try {
    const { uid, id, charge_name, convenience_charge, over_weight_charge,rebooking, cancel, no_show } =
      req.body;
    
    const getData = await dbConfig("chargetable_master").where("id", id).first();
    
    var data = {
      charge_name: charge_name,
      convenience_charge: convenience_charge,
      over_weight_charge: over_weight_charge,
      rebooking: JSON.stringify(rebooking),
      cancel: JSON.stringify(cancel),
      no_show:JSON.stringify(no_show)
    }
    

    if (getData) {
      data.updateAt = new Date();
      data.updateBy = uid;

      await dbConfig("chargetable_master").where("id", id).update(data);
      await dbConfig("logs").insert({
        event_Id: id,
        event_name: "ChangeTable",
        type: "UPDATE",
        createAt: new Date(),
        createBy: uid,
      });
      return res.json({
        status: true,
        msg: "Updated Successfully!!"
      })
      
    }
    else {
      data.createAt = new Date();
      data.createBy = uid;
      
      var insert = await dbConfig("chargetable_master").insert(data);
      await dbConfig("logs").insert({
        event_Id: insert[0],
        event_name: "ChargeTable",
        type: "INSERT",
        createAt: new Date(),
        createBy: uid,
      });
      return res.json({
        status: true,
        msg: "Inserted Successfully!!",
      });
    
    }

    
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message,
    });
  }
}

async function chargeTableList(req, res) {
  try {
    const { search_term } = req.body;

    const getData = await dbConfig("chargetable_master")
      .select(
        "id",
        "charge_name",
        "rebooking",
        "no_show",
        "cancel",
        "convenience_charge",
        "over_weight_charge"
      )
      .where(
        "charge_name",
        "like",
        "%" + search_term + "%"
      )
      .where("isdelete", 0);
    
    return res.json({
      status: true,
      data: getData
    })

    
  } catch (err) {
    return res.json({
      status: false,
      msg: err.message
    })
  }
}

async function deleteChargeTable(req, res) {
  try {
    const { uid, id } = req.body;
       await dbConfig("chargetable_master")
         .where("id", id)
         .update({ isdelete: 1 });
       await dbConfig("logs").insert({
         event_Id: id,
         event_name: "ChargeTable",
         type: "DELETE",
         createAt: new Date(),
         createBy: uid,
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

async function getChargeTableById(req, res) {
  try {

    const getList = await dbConfig("chargetable_master")
      .where("isdelete", 0)
      .andWhere("id", req.params["id"]);

    return res.json({
      st: true,
      data: getList,
    });
  } catch (err) {
    return res.json({
      st: false,
      msg: err.message,
    });
  }
}



const master = {
  //airport
  insertEdit_Airport,
  airportList,
  deleteAirport,
  //aircraftcategory
  insertEdit_AircraftCategory,
  aircraftcategoryList,
  deleteaircraftcategory,
  getAircraftCategory,
  //aircfraft
  insertEditAircraft,
  aircraftList,
  deleteaircraft,
  // pilot
  insertEditPilot,
  pilotList,
  deletePilot,
  // pax
  insertEditPax,
  paxList,
  deletePax,
  //fargrade
  getPax,
  insertEditFareGrade,
  fareGradeList,
  deleteFareGrade,
  // chargeTable
  InsertEditChargeTable,
  chargeTableList,
  deleteChargeTable,
  getChargeTableById,
};
module.exports = master;
