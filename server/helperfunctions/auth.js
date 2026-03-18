const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {jwt_secret_key}  = require("../constants/env.js")
exports.generateHashPassword = async(password) =>{
    const hashedPassword = await bcryptjs.hash(password, 13)
    return hashedPassword
}


exports.createToken = async (user)=>{
    const token = await jwt.sign(user, jwt_secret_key, {expiresIn:"24h"})
return token
}