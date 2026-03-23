const {param} = require("express-validator")

exports.mongoId = [ 
    param("id").isMongoId().withMessage("Provide correct id")
]