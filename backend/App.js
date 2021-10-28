require('./db/db')
require('dotenv').config();
const mongoose = require('mongoose')
const AdminRouter = require ('./routes/Admin')
const databaseName = process.env.DATABASE_NAME
const databaseUsername = process.env.DATABASE_USERNAME 
const databasePassword = process.env.DATABASE_PASSWORD
const clusterName = process.env.CLUSTER

const User = require('./models/User')
const Flight = require('./models/Flight')

const express = require("express")
const app = express();
app.use('/admin',AdminRouter)
app.use(express.json())
const port = process.env.PORT || "8000";
app.get("/Home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
