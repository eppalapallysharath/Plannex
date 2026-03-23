const {userModel} = require("../models/usersModel.js")
exports.users = async(req, res, next)=>{
     try {
        const allUsers = await userModel.find({role:{$ne:"admin"}})
        res.json({success:true, message:"Fetched all users", data:{code:"FETCHED_ALL_USERS", data:allUsers}})
    } catch (error) {
         const err = new Error(error);
    err.statusCode = 400;
    next(err);
    }
}

exports.getUser = async(req, res, next)=>{
     try {
        const user = await userModel.findOne({_id:req.params.id, role:{$in: ["participant", "organizer"] }})
        if(!user){
            return res.status(404).json({success:false, message:"no user found", error:{code:"NO USER FOUND", data:null}})
        }
        return res.json({
            success:true, message:"Fetched users by id", data:{code:"FETCHED_USERS_BY_ID", data:user}
        })
    } catch (error) {
 const err = new Error(error);
    err.statusCode = 400;
    next(err);    }
}

exports.deleteUser = async(req, res, next)=>{
     try {
        const deleteUser = await userModel.deleteOne({_id:req.params.id, role:{$in:["participant", "organizer"]}})
        if(!deleteUser){
            return res.status(404).json({success:false, message:"no user found", error:{code:"NO USER FOUND", data:null}})
        }
        res.json({success:true, message:"User Deleted successfully", data:{
            code: "USER_DELETED", data:deleteUser
        }})
    } catch (error) {
 const err = new Error(error);
    err.statusCode = 400;
    next(err);    }
}