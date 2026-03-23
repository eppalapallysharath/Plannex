const express = require("express");
const router = express.Router()
const {deleteUser, getUser, users} = require("../controllers/admin.js")
const {validateAuthHeaders} = require("../validations/auth.js") 
const {validation} = require("../middlewares/validations.js")
const {authentication, authorization} = require("../middlewares/auth.js")
const {mongoId} = require("../validations/admin.js")

router.get("/", validateAuthHeaders, validation, authentication, authorization("admin" ),users)
router.get("/:id", mongoId, validateAuthHeaders, validation, authentication, authorization("admin" ), getUser)
router.delete("/:id", mongoId, validateAuthHeaders, validation, authentication, authorization("admin" ), deleteUser)

module.exports = router