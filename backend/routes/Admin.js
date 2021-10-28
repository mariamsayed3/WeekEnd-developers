const express = require('express')
const controllers = require ('../controllers/Admin')
const router = new express.Router()

router.use(express.json())
router.patch('/update_flight/:flightID', controllers.updateFlight)

module.exports = router