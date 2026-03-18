const express = require("express");
const router = express.Router()
const {register, login, profile, updateProfile , signupAsOrganizers} = require("../controllers/auth.js")
const {registerChecks,loginChecks, validateAuthHeaders} = require("../validations/auth.js")
const {validation} = require("../middlewares/validations.js")
const {authentication} = require("../middlewares/auth.js")

router.post("/register", registerChecks, validation, register )

router.post("/signupAsOrganizer",registerChecks,validation, signupAsOrganizers)

router.post("/login", loginChecks, validation,login )

router.get("/profile", validateAuthHeaders, validation, authentication, profile)

router.put("/updateProfile/:id", updateProfile)

module.exports = router