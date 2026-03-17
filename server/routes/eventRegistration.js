const express = require("express");
const router = express.Router()
const { registerEvent, cancelEvent, getEventParticipants, myEvents} = require("../controllers/eventRegistrations.js")


router.post("/register/:eid", registerEvent)
router.delete("/cancel/:eid", cancelEvent)
router.get("/my-events", myEvents)
router.get("/:eid/participants", getEventParticipants)

module.exports = router