require('./db/db')
require('dotenv').config();
const mongoose = require('mongoose')

const databaseName = process.env.DATABASE_NAME
const databaseUsername = process.env.DATABASE_USERNAME 
const databasePassword = process.env.DATABASE_PASSWORD
const clusterName = process.env.CLUSTER

const User = require('./models/User')
const Flight = require('./models/Flight')