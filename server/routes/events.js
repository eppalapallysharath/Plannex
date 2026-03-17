const express = require("express");
const router = express.Router()
const {createEvent, getAllEvents, getEvent, updateEvent, deleteEvent} = require("../controllers/event.js")

router.post("/createEvent",createEvent)
router.get("/", getAllEvents)
router.get("/:eid",getEvent)
router.put("/:eid", updateEvent)
router.delete("/:eid",deleteEvent)

module.exports = router