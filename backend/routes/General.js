const express = require("express");
const controllers = require("../controllers/General");
const router = new express.Router();
router.use(express.json());

router.post('/login', controllers.login)
router.post('/register', controllers.register)


module.exports = router