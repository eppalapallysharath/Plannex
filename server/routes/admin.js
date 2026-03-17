const express = require("express");
const router = express.Router()
const {deleteUser, getUser, users} = require("../controllers/admin.js")

router.get("/", users)
router.get("/:id", getUser)
router.delete("/:id", deleteUser)

module.exports = router