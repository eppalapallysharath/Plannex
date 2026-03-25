const express = require("express");
const router = express.Router()
const {createEvent, getAllEvents, getEvent, updateEvent, deleteEvent} = require("../controllers/event.js")
const {validateAuthHeaders} = require("../validations/auth.js")
const {validation} = require("../middlewares/validations.js")
const {authentication, authorization} =require("../middlewares/auth.js")
const {createEventChecks, idCheck, updateEventChecks} = require("../validations/events.js")
const {upload} =require('../configs/multer.js')

router.post("/createEvent", upload.single("poster"), createEventChecks,validateAuthHeaders, validation, authentication, authorization("organizer"),createEvent)
router.get("/", getAllEvents)
router.get("/:eid", idCheck, validation ,getEvent)
router.put("/:eid", upload.single("poster"), idCheck, updateEventChecks, validateAuthHeaders,validation , authentication, authorization("organizer") ,updateEvent)
router.delete("/:eid",idCheck,validateAuthHeaders,validation, authentication, authorization("organizer"),deleteEvent)

module.exports = router