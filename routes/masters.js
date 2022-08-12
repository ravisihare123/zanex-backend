const master = require("../controller/master");
const baseHelper = require("../database/dbConfig");
const router = require("express").Router();

router.post("/insertEdit_airport", master.insertEdit_Airport);
router.post("/airportlist", master.airportList);
router.post("/delete_airport", master.deleteAirport);
module.exports = router;