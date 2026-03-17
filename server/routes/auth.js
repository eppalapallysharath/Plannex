const express = require("express");
const router = express.Router()
const {register, login, profile, updateProfile } = require("../controllers/auth.js")

router.post("/register", register, )

router.post("/login",login )


router.get("/profile", profile)

router.put("/updateProfile/:id", updateProfile)

module.exports = router