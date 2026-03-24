const mongoose  = require("mongoose")

const eventsSchema = new mongoose.Schema({
    title:{type: String, required: true},
    description:{type:String, required:true},
    category:{type:String, required:true},
    location:{type:String, required:true},
    date:{type:Date, required:true},
    capacity:{type:Number, required:true},
    posterImage:{type:String, required:true},
    organizedID:{type:mongoose.Types.ObjectId, required:true, ref: "users" },
    price:{type:Number, required:true}
},{timestamps:true})

const eventsModel = mongoose.model("events", eventsSchema)
module.exports = {eventsModel}