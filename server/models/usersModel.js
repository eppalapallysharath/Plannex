const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name:{type:String, required:true, trim: true},
    email:{type:String, required:true, trim: true, unique: true},
    password:{type:String, required:true, trim:true},
    role:{type:String, required:true, default:"participant", enum:["participant", "organizer", "admin"]},
    profileImage:{
        filePath: {type:String, default:"default image"},
        fileUrl: {type:String, default:"https://cdn-icons-png.flaticon.com/512/8847/8847419.png"}
    }
},{timestamps:true})
exports.userModel = mongoose.model("users", usersSchema)