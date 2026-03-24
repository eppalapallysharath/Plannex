const {eventsModel} = require("../models/eventsModel.js")
const {userModel} = require("../models/usersModel.js")
const cloudinary = require("../configs/cloudinary.js")
const fs = require("fs")
exports.createEvent = async(req,res)=>{
    try {
        const {title, description, price, location, category, capacity, date} = req.body
        if(!req.file.mimetype.startsWith("image/")){
            return res.status(400).json({
          success: false,
          message: "Poster Image must be an image",
          error: {
            code: "POSTE_IMAGE_ONLY",
          },
        });
        }
        const poster = await cloudinary.uploader.upload(
            req.file.path, {
                folder: "plannex",
                resource_type: "image",
            }
        )
        fs.unlink(req.file.path, ()=>{})
        const createEvent = await eventsModel.create({
            title, description, price, location, capacity, category, date, posterImage:poster.secure_url, organizedID:req.user._id
        })
        const addEventUser = await userModel.findByIdAndUpdate(req.user._id, {$push:{events:createEvent._id}})
        res.json({
            success:true, 
            message:"Event created successfully",
            data:{
                code:"EVENT_CREATED",
                data:createEvent
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.getAllEvents = async(req,res)=>{
    try {
       const events = await eventsModel.find();
       res.json({
        success:true, message:"Fetched all events",
        data:{
            code:"FETCHED_ALL_EVENTS",
            data:events
        }
       })
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.getEvent = async(req,res)=>{
    try {
        const event = await eventsModel.findById(req.params.eid)
        if(!event){
           return res.status(404).json({
            success:true, 
            message: "event not found",
            data:{
                code:"EVENT_NOT_FOUND",
                data:null
            }
        })
        }
        res.json({
            success:true, 
            message:"Fetched event",
            data:{
                code:"FETCHED EVENT",
                data:event
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.updateEvent = (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.deleteEvent = (req,res)=>{
    try {
        res.send("delete event")
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.uploadEventPoster = (req, res, next)=>{
    try {
        res.send("upload events")
    } catch (error) {
        console.log("error .....")
        next(error)
    }
}