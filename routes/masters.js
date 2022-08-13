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
router.post(
  "/deleteaircraftcategory",
  baseHelper.checkAdminToken,
  master.deleteaircraftcategory
);

module.exports = router;