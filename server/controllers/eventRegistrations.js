exports.registerEvent = (req,res)=>{
    try {
        res.send("register event")
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.cancelEvent = (req,res)=>{
    try {
        res.send("cancel event")
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.myEvents = (req,res)=>{
    try {
        res.send("my events")
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}


exports.getEventParticipants = (req,res)=>{
    try {
        res.send(" participants  list ")
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}