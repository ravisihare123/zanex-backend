var express = require("express");
var router = express.Router();
const master = require("../controller/master");
const baseHelper = require("../helpers/basehelper");

// airport
router.post("/insertEdit_airport",baseHelper.checkAdminToken, master.insertEdit_Airport);
router.post("/airportlist",baseHelper.checkAdminToken, master.airportList);
router.post("/delete_airport", baseHelper.checkAdminToken, master.deleteAirport);

//aircraft category
router.post("/inserteditaircraftcategory", baseHelper.checkAdminToken, master.insertEdit_AircraftCategory)
router.post("/aircraftcategorylist", baseHelper.checkAdminToken, master.aircraftcategoryList);
router.post("/deleteaircraftcategory", baseHelper.checkAdminToken, master.deleteaircraftcategory);
router.get("/getaircraftcategory", baseHelper.checkAdminToken, master.getAircraftCategory);

// aircraft
router.post("/inserteditaircraft",baseHelper.checkAdminToken,master.insertEditAircraft);
router.post("/aircraftList", baseHelper.checkAdminToken, master.aircraftList);
router.post('/deleteaircraft', baseHelper.checkAdminToken, master.deleteaircraft);

//pilot
router.post("/inserteditpilot", baseHelper.checkAdminToken, master.insertEditPilot);
router.post("/pilotlist", baseHelper.checkAdminToken, master.pilotList);
router.post("/deletepilot", baseHelper.checkAdminToken, master.deletePilot);

//pax
router.post("/inserteditpax", baseHelper.checkAdminToken, master.insertEditPax);

module.exports = router;