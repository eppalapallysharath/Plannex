const express = require("express");
const router = express.Router()
const {register, login, profile, updateProfile , signupAsOrganizers} = require("../controllers/auth.js")
const {registerChecks,loginChecks, validateAuthHeaders, updateProfileValidation} = require("../validations/auth.js")
const {validation} = require("../middlewares/validations.js")
const {authentication} = require("../middlewares/auth.js")
const {upload} = require("../configs/multer.js")

router.post("/register", registerChecks, validation, register )

router.post("/signupAsOrganizer",registerChecks,validation, signupAsOrganizers)

router.post("/login", loginChecks, validation,login )

router.get("/profile", validateAuthHeaders, validation, authentication, profile)

router.put("/updateProfile/:id", upload.single("profile_pic"), updateProfileValidation, validateAuthHeaders, validation, authentication, updateProfile)

module.exports = router