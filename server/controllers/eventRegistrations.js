const {eventsModel} = require("../models/eventsModel.js")
const {eventRegistrationsModel} = require("../models/eventRegistrationModel.js")
const {mail} = require("../configs/nodemailer.js") 
const {eventRegistrationTemplate} = require("../helperfunctions/emailTemplate.js")
const {email} = require("../constants/env.js")
exports.registerEvent = async(req,res)=>{
    try {
        const checkEvent = await eventsModel.findById(req.params.eid)
        if(!checkEvent) {
            res.status(404).json({success:false, message:"event not found", error:{code:"EVENT NOT FOUND",data:null}})
        }
        const checkDuplicate = await eventRegistrationsModel.findOne({eventId:req.params.eid, userId:req.user._id})
        if(checkDuplicate){
            return res.status(409).json({
                success:false, message:"user already registered for event", error:{code:"ALREADY REGISTERED",data:checkDuplicate}
            })
        }

        const registerEvent = await eventRegistrationsModel.insertOne({
            eventId:req.params.eid, userId:req.user._id, registrationDate: Date.now(), status:"confirmed"
        })
        await registerEvent.save()
        const event = await eventsModel.findById(req.params.eid)
        console.log(event)
        await mail.sendMail({
            to:req.user.email,
            from:email,
            subject:"Event Registration Successful 🎟️",
            html:eventRegistrationTemplate(req.user.name,event.title, event.date, event.location )
        })
        res.status(201).json({success:true, message:"Event registered successfully", data:{code:"EVENT REGISTERED SUCCESSFULLY",data:registerEvent}})

    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.cancelEvent = async(req,res)=>{
    try {
        const checkEvent = await eventRegistrationsModel.findOne({eventId:req.params.eid, userId:req.user._id}).populate("eventId")
        if(!checkEvent){
            return res.status(404).json({success:false, message:"Event not found for cancel", error:{
                code:"UNABLE CANCEL EVENT NOT FOUND",
                date:null
            }})
        }
        if(checkEvent.status==="canceled"){
            return res.status(400).json({success:false, message:"Event already canceled", error:{
                code:"EVENT ALREADY CANCELED",
                data:checkEvent
            }})
        }
        checkEvent.status= "canceled"
        await checkEvent.save()
        res.json({
            success:true,
            message:"Event canceled successfully",
            data:{
                code:"EVENT CANCELED",
                data:checkEvent
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.myEvents = async(req,res)=>{
    try {
        const getRegisteredEvents = await eventRegistrationsModel.find({userId:req.user._id}).populate(["eventId", "userId"],["-__v"])
        res.json({
            success:true, message:"Fetched all registered events", data:{code:"FETCHED ALL EVENTS",data:getRegisteredEvents}
        })
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}


exports.getEventParticipants = async(req,res)=>{
    try {
        const getALlParticipants = await eventRegistrationsModel.find({eventId:req.params.eid}).populate("userId", ["name", "email", "profileImage", "createdAt", "updatedAt", "-_id"])
        res.json({success:true, message:"Fetched all event participants", data:{
            code:"FETCHED ALL PARTICIPANTS", data:getALlParticipants
        }})
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}