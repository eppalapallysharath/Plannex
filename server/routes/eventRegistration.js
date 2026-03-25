const express = require("express");
const router = express.Router()
const { registerEvent, cancelEvent, getEventParticipants, myEvents} = require("../controllers/eventRegistrations.js")
const {authentication, authorization} = require("../middlewares/auth.js")
const {idCheck} = require("../validations/events.js")
const {validation} = require("../middlewares/validations.js") 
const {validateAuthHeaders} = require("../validations/auth.js")

router.post("/register/:eid",idCheck, validateAuthHeaders, validation, authentication,authorization("participant"), registerEvent)
router.get("/my-events",  validateAuthHeaders, validation, authentication, authorization("participant"),myEvents)
router.delete("/cancel/:eid", idCheck, validateAuthHeaders, validation, authentication, authorization("participant"), cancelEvent)
router.get("/:eid/participants", idCheck, validateAuthHeaders, validation, authentication, authorization("organizer"), getEventParticipants)

module.exports = router