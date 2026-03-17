const express = require("express");
const router = express.Router()
const { uploadEventPoster} =require("../controllers/event.js")

router.put("/event/:eid",uploadEventPoster)

module.exports = router