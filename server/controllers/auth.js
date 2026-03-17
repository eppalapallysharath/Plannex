exports.register = async(req, res)=>{
    try {
        res.send("register")
    } catch (error) {
        res.status(400).send("something went wrong")
    }
}

exports.login = async(req, res)=>{
    try {
        res.send("login")
    } catch (error) {
        res.status(400).send("something went wrong")
    }
}

exports.profile = async(req, res)=>{
    try {
        res.send("profile")
    } catch (error) {
        res.status(400).send("something went wrong")
    }
}


exports.updateProfile =  async(req, res)=>{
    try {
        res.send("update profile")
    } catch (error) {
        res.status(400).send("something went wrong")
    }
}