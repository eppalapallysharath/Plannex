const jwt = require("jsonwebtoken")
const {jwt_secret_key} = require("../constants/env.js")
const {userModel} = require("../models/usersModel.js")
exports.authentication = async(req, res, next)=>{
    try {
          const {authorization} = req.headers
    const token  = authorization.split(" ")[1]
    const decodeToken = await jwt.verify(token, jwt_secret_key)
    const verify = await userModel.findOne({email:decodeToken.email}) 
    if(verify){
        req.user = verify
        next()
    }else{
        return res.status(401).json({success:true, message:"Unauthorized user", error:{
         code:"UNAUTHORIZED USER", 
         data: null
        }})
    }
    } catch (error) {
        const err = new Error(error)
        err.statusCode = 401
       next(err) 
    }
  
}