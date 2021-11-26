const express = require("express");
const controllers = require("../controllers/Admin");
const router = new express.Router();

router.use(express.json());

router.get("/get_flight/:flightID", controllers.getFlight);

router.patch("/update_flight/:flightID", controllers.updateFlight);

router.post("/create_flight", controllers.createFlight);

module.exports = router
router.delete("/delete_flight/:flightID", controllers.deleteFlight);

router.get("/get_all_flights", controllers.getAllFlights);

module.exports = router;
