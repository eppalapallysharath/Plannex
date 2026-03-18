exports.apiNotFound=(req, res, next)=>{
    res.status(404).json({endpoint: req.method+ " " + req.url  ,message: "api not found"})
}

exports.globalError=(error, req, res, next)=>{
    console.log(error)
    return res.status(error.statusCode).json({success:false, message:error.message || "something went wrong", error:{
        code: error.message.toUpperCase() || "SOMETHING_WENT_WRONG",
        data:error.message
    }})
}