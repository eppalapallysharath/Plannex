const multer = require("multer");

const storage = multer.diskStorage({
    filename:(req, file, cb)=>{
        cb(null, Date.now() + file.originalname)
    },
    destination:(req,file, cb )=>{
        cb(null, "uploads")
    }
})


exports.upload =  multer({storage:storage, limits: 1024*1024*5},)