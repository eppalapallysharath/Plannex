exports.users = (req, res)=>{
     try {
        res.send("users")
    } catch (error) {
        res.status(400).send("something went wrong")
    }
}

exports.getUser = (req, res)=>{
     try {
        res.send("get user")
    } catch (error) {
        res.status(400).send("something went wrong")
    }
}

exports.deleteUser = (req, res)=>{
     try {
        res.send("delete user")
    } catch (error) {
        res.status(400).send("something went wrong")
    }
}