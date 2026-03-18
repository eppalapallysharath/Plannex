const mongoose = require("mongoose")
const {mongouri, dbName}  = require("../constants/env.js")

exports.connectDb = async()=>{
    try {
        await mongoose.connect(mongouri, {dbName:dbName})
        console.log(`database connected successfully with ${dbName} `)
    } catch (error) {
      console.log("database connection error")
      throw new Error(error)
    } 
}