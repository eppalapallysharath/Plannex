exports.apiNotFound=(req, res, next)=>{
    res.status(404).json({endpoint: req.method+ " " + req.url  ,message: "api not found"})
}

exports.globalError=(error, req, res, next)=>{
    return res.status(400).json({message:"something went wrong", error_code:error.message})
}