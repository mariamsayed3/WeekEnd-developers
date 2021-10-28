require('./db/db')
require('dotenv').config();
const mongoose = require('mongoose')

const User = require('./models/User')
const Flight = require('./models/Flight')
const Booking = require('./models/Booking')

