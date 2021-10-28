require('dotenv').config();
const mongoose = require('mongoose')

const databaseName = process.env.DATABASE_NAME
const databaseUsername = process.env.DATABASE_USERNAME 
const databasePassword = process.env.DATABASE_PASSWORD
const clusterName = process.env.CLUSTER


const connect = async () => {
    try{
        await mongoose.connect(
            `mongodb+srv://${databaseUsername}:${databasePassword}@${clusterName}.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        console.log('Connected successfully')

    }catch(err){
        console.log(err)
    }
}
connect()
